'use client';

import { useState } from 'react';

export default function PayCalculator() {
  const [total, setTotal] = useState<number>(0);

  const roles = [
    { key: 'P', label: 'Viện Trưởng' },
    { key: 'VP1', label: 'Viện Phó 1' },
    { key: 'VP2', label: 'Viện Phó 2' },
    { key: 'Lead', label: 'Team Lead' },
    { key: 'Mem', label: 'Team Member' },
    { key: 'Trainee', label: 'Thực Tập Sinh' }
  ];

	const [percentages, setPercentages] = useState<Record<string, number>>({
	  P: 0,
	  VP1: 0,
	  VP2: 0,
	  Lead: 0,
	  Mem: 0,
	  Trainee: 0
	});

  const handlePercentChange = (role: string, value: number) => {
    setPercentages(prev => ({ ...prev, [role]: value }));
  };

  const totalPercent =
    percentages.P +
    percentages.VP1 +
    percentages.VP2 +
    percentages.Lead +
    percentages.Mem +
    percentages.Trainee;

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: 'url("/horizonbg.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '40px 20px',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: 30,
		  color: 'black',
          borderRadius: 16,
          width: '100%',
          maxWidth: 600,
          boxShadow: '0 4px 12px rgba(0,0,0,0.25)'
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: 20, fontWeight: 'bold' }}>
          Pay Calculator
        </h2>

        {/* Total Amount Input */}
        <div style={{ marginBottom: 25 }}>
          <label style={{ fontWeight: 'bold', fontSize: 16 }}>Total Amount:</label>
          <input
            type="number"
            value={total}
            onChange={(e) => setTotal(Number(e.target.value))}
            style={{
              padding: 12,
              marginLeft: 10,
              borderRadius: 8,
              fontSize: 18,
              border: '2px solid #ccc',
              width: 150
            }}
          />
        </div>

        {/* Warning if % > 100 */}
        {totalPercent > 100 && (
          <div
            style={{
              color: 'white',
              backgroundColor: 'red',
              padding: 10,
              borderRadius: 8,
              marginBottom: 20,
              fontWeight: 'bold',
              textAlign: 'center'
            }}
          >
            Total percentage cannot exceed 100% (Current: {totalPercent}%)
          </div>
        )}

        {/* Role Inputs */}
        {roles.map(role => (
          <div key={role.key} style={{ marginBottom: 18 }}>
            <label style={{ fontWeight: 'bold', fontSize: 16 }}>
              {role.label} %:
            </label>

            <input
              type="number"
              value={percentages[role.key]}
              onChange={(e) =>
                handlePercentChange(role.key, Number(e.target.value))
              }
              style={{
                padding: 10,
                marginLeft: 10,
                borderRadius: 8,
                fontSize: 18,
                border: '2px solid #ccc',
                width: 80
              }}
            />

            {/* Calculated Amount */}
            <span
              style={{
                marginLeft: 20,
                fontWeight: 'bold',
                fontSize: 18,
                color: '#333'
              }}
            >
              ${((total * percentages[role.key]) / 100).toFixed(2)}
            </span>
          </div>
        ))}

        {/* Total % Display */}
        <div style={{ marginTop: 25, fontWeight: 'bold', fontSize: 18 }}>
          Total %: {totalPercent}%
        </div>
      </div>
    </div>
  );
}
