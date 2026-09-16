import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Droplets, ChevronRight } from 'lucide-react';
import AvailabilityBadge from './AvailabilityBadge';

const BloodBankCard = ({ bloodBank }) => {
  const {
    _id,
    name,
    address,
    city,
    phone,
    openingTime,
    closingTime,
    bloodAvailability,
  } = bloodBank;

  // Filter available blood groups
  const availableGroups = bloodAvailability
    ? Object.entries(bloodAvailability).filter(
        ([_, info]) => info && info.availableUnits > 0
      )
    : [];

  const totalUnits = availableGroups.reduce(
    (sum, [_, info]) => sum + (info.availableUnits || 0),
    0
  );

  const overallStatus = totalUnits >= 20 ? 'Available' : totalUnits > 0 ? 'Low' : 'Not Available';

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <h3 style={{ fontSize: '1.15rem', color: '#991b1b', margin: 0 }}>{name}</h3>
          <AvailabilityBadge status={overallStatus} />
        </div>

        <div style={{ fontSize: '0.9rem', color: '#4b5563', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
            <MapPin size={16} color="#dc2626" style={{ marginTop: '3px', flexShrink: 0 }} />
            <span>{address}, <strong>{city}</strong></span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Phone size={16} color="#dc2626" style={{ flexShrink: 0 }} />
            <span>{phone}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={16} color="#dc2626" style={{ flexShrink: 0 }} />
            <span>{openingTime} - {closingTime}</span>
          </div>
        </div>

        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.375rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Droplets size={14} color="#dc2626" /> Available Groups:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
            {availableGroups.length > 0 ? (
              availableGroups.map(([group, info]) => (
                <span
                  key={group}
                  style={{
                    backgroundColor: '#fee2e2',
                    color: '#991b1b',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.5rem',
                    borderRadius: '4px',
                    border: '1px solid #fca5a5',
                  }}
                >
                  {group}: {info.availableUnits}u
                </span>
              ))
            ) : (
              <span style={{ fontSize: '0.8rem', color: '#9ca3af', italic: 'true' }}>No units available</span>
            )}
          </div>
        </div>
      </div>

      <div>
        <Link to={`/bloodbanks/${_id}`} className="btn btn-outline" style={{ width: '100%' }}>
          View Details <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default BloodBankCard;
