import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ExternalLink, 
  ArrowRight, 
  GraduationCap, 
  Tractor, 
  Store, 
  HeartPulse, 
  Home as HomeIcon, 
  Award,
  FileText,
  CheckCircle2
} from 'lucide-react';

const categories = [
  { id: 'all', label: 'सभी योजनाएं (All)' },
  { id: 'education', label: 'शिक्षा (Education)' },
  { id: 'agriculture', label: 'कृषि (Agriculture)' },
  { id: 'business', label: 'व्यापार / लोन (Business)' },
  { id: 'healthcare', label: 'स्वास्थ्य (Healthcare)' },
  { id: 'housing', label: 'आवास (Housing)' },
  { id: 'social welfare', label: 'महिला व बाल (Social)' },
];

const getCategoryIcon = (cat = '') => {
  const c = cat.toLowerCase();
  if (c.includes('edu')) return <GraduationCap size={20} color="#1a73e8" />;
  if (c.includes('agri')) return <Tractor size={20} color="#137333" />;
  if (c.includes('biz') || c.includes('business')) return <Store size={20} color="#e65100" />;
  if (c.includes('health')) return <HeartPulse size={20} color="#00838f" />;
  if (c.includes('house') || c.includes('housing')) return <HomeIcon size={20} color="#6a1b9a" />;
  return <Award size={20} color="#1a73e8" />;
};

const AllSchemes = ({ onSelectScheme }) => {
  const [schemes, setSchemes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/schemes')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.schemes) {
          setSchemes(data.schemes);
        }
      })
      .catch((err) => console.error("Error fetching schemes:", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredSchemes = schemes.filter((s) => {
    const matchesCat = selectedCategory === 'all' || s.category?.toLowerCase() === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || 
      s.name?.toLowerCase().includes(q) || 
      s.description?.toLowerCase().includes(q) || 
      s.benefit?.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="main-content">
      {/* Title */}
      <div className="text-center mb-3">
        <h1 style={{ color: '#0f172a' }}>
          कल्याणकारी योजनाएं (Government Schemes)
        </h1>
        <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.05rem' }}>
          भारत सरकार और राज्य सरकारों द्वारा नागरिकों के लिए संचालित प्रमुख योजनाओं की विस्तृत सूची।
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="search-bar-wrap" style={{ margin: '1rem 0' }}>
        <div className="search-bar">
          <Search size={20} style={{ color: '#64748b', marginRight: '0.5rem' }} />
          <input 
            type="text" 
            placeholder="योजना का नाम या कीवर्ड खोजें (उदा. 'Kisan', 'Loan', 'Scholarship')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="btn btn-outline"
              style={{ padding: '0.3rem 0.8rem', fontSize: '0.8rem' }}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="filter-tabs">
        {categories.map((c) => (
          <button
            key={c.id}
            className={`filter-pill ${selectedCategory === c.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Schemes List Grid */}
      {loading ? (
        <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          योजनाएं लोड हो रही हैं...
        </div>
      ) : filteredSchemes.length === 0 ? (
        <div className="card text-center" style={{ padding: '3rem' }}>
          <p style={{ fontSize: '1.1rem' }}>कोई योजना नहीं मिली। कृपया अन्य कीवर्ड या श्रेणी चुनें।</p>
        </div>
      ) : (
        <div className="schemes-catalog-grid">
          {filteredSchemes.map((s) => (
            <div key={s.id} className="scheme-card-item">
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span className={`badge badge-${(s.category || 'education').toLowerCase().replace(/\s+/g, '-')}`}>
                    {s.category}
                  </span>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#f8fafd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {getCategoryIcon(s.category)}
                  </div>
                </div>

                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#0f172a' }}>
                  {s.name}
                </h3>

                {s.benefit && (
                  <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '0.5rem 0.75rem', borderRadius: '8px', fontSize: '0.85rem', color: '#166534', fontWeight: 600, marginBottom: '0.75rem' }}>
                    ✨ {s.benefit}
                  </div>
                )}

                <p style={{ fontSize: '0.925rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.5 }}>
                  {s.description}
                </p>

                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.825rem', color: 'var(--text-sub)', marginBottom: '1.25rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <FileText size={14} /> {s.documents?.length || 0} Documents
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <CheckCircle2 size={14} /> {s.steps?.length || 0} Steps
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', paddingTop: '1rem', borderTop: '1px solid #f1f5f9' }}>
                <button 
                  className="btn btn-primary"
                  style={{ flex: 1, padding: '0.6rem 1rem', fontSize: '0.9rem' }}
                  onClick={() => onSelectScheme(s)}
                >
                  विस्तार से देखें (Details)
                  <ArrowRight size={16} />
                </button>
                {s.official_url && (
                  <a
                    href={s.official_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                    style={{ padding: '0.6rem 0.8rem' }}
                    title="आधिकारिक पोर्टल खोलें"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllSchemes;
