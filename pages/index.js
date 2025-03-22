import Head from 'next/head';
import React, { useState } from 'react';

export default function Home() {
  return (
    <>
      <Head>
        <title>PFI Technical Freediving SIT Calc</title>
        <style>{`
          @media (max-width: 600px) {
            .container {
              padding: 20px 10px !important;
            }
            h1 {
              font-size: 22px !important;
            }
            input, button {
              font-size: 14px !important;
              padding: 8px !important;
            }
            .time-inputs {
              flex-direction: column !important;
            }
          }
        `}</style>
      </Head>
      <div
        className="container"
        style={{
          background: 'linear-gradient(to bottom, #001f33, #000)',
          color: '#fff',
          minHeight: '100vh',
          padding: '40px 20px',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <h1 style={{ textAlign: 'center', marginBottom: 30 }}>
          Freedive Surface Interval Calculator
        </h1>

        <div style={{ marginBottom: 20 }}>
          <label>Dive Time</label>
          <div
            className="time-inputs"
            style={{ display: 'flex', gap: '10px' }}
          >
            <input type="number" placeholder="min" style={{ flex: 1 }} />
            <input type="number" placeholder="sec" style={{ flex: 1 }} />
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label>Recovery Gas</label>
          <div style={{ marginTop: 10 }}>
            <button>Air</button>
            <button>EAN 80%</button>
          </div>
        </div>

        <button
          style={{
            width: '100%',
            padding: 12,
            borderRadius: 8,
            backgroundColor: '#ec1c24',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '16px',
            cursor: 'pointer',
            border: 'none',
            boxShadow: '0 0 10px #ec1c24',
          }}
        >
          Calculate
        </button>
      </div>
    </>
  );
}
