'use client';

import { useState } from 'react';

// Format numbers with commas + 2 decimals
const formatMoney = (value: number) => {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

export default function PayCalculatorFixed() {
  const [total, setTotal] = useState<number>(0);

  // Hard-set percentages
  const roles = [
    { label: 'Viện Trưởng', percent: 15 },
    { label: 'Viện Phó 1', percent: 7.5 },
    { label: 'Viện Phó 2', percent: 7.5 },
    { label: 'Ca Trưởng', percent: 20 },
    { label: 'Nhân Viên', percent: 40 },
    { label: 'Thực Tập Sinh', percent: 10 }
  ];

  const totalPercent = roles.reduce((sum, r) => sum + r.percent, 0);

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
          color: 'black',
          padding: 30,
          borderRadius: 16,
          width: '100%',
          maxWidth: 600,
          boxShadow: '0 4px 12px rgba(0,0,0,0.25)'
        }}
      >
        <h1
          style={{
            textAlign: 'center',
            marginBottom: 20,
            fontWeight: 'bold',
            fontSize: '40px'
          }}
        >
          Quỹ Lương
        </h1>

        {/* Total Amount Input */}
        <div style={{ marginBottom: 25 }}>
          <label style={{ fontWeight: 'bold', fontSize: 16 }}>Tổng Quỹ:</label>
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
              width: 180
            }}
          />
        </div>

        {/* Total % Display */}
        <div
          style={{
            marginBottom: 20,
            fontWeight: 'bold',
            fontSize: 16,
            color: totalPercent !== 100 ? 'red' : 'green'
          }}
        >
          Tổng %: {totalPercent}%  
          {totalPercent !== 100 && ' (Cảnh báo: tổng phải bằng 100%)'}
        </div>

        {/* Role Outputs */}
        {roles.map(role => (
          <div key={role.label} style={{ marginBottom: 18 }}>
            <label style={{ fontWeight: 'bold', fontSize: 16 }}>
              {role.label} ({role.percent}%):
            </label>

            <span
              style={{
                marginLeft: 20,
                fontWeight: 'bold',
                fontSize: 18,
                color: '#333'
              }}
            >
              ${formatMoney((total * role.percent) / 100)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
