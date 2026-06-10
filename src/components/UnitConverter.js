'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { convert, formatResult, getUnitsForCategory, getDefaultPair } from '@/lib/units';
import styles from './UnitConverter.module.css';

export default function UnitConverter({ category }) {
  const t = useTranslations('common');
  const tUnits = useTranslations('units');

  const units = getUnitsForCategory(category);
  const [defaultFrom, defaultTo] = getDefaultPair(category);

  const [value, setValue] = useState('1');
  const [fromUnit, setFromUnit] = useState(defaultFrom);
  const [toUnit, setToUnit] = useState(defaultTo);
  const [copied, setCopied] = useState(false);
  const [swapping, setSwapping] = useState(false);

  const result = convert(value, fromUnit, toUnit, category);
  const formattedResult = formatResult(result);

  const handleSwap = useCallback(() => {
    setSwapping(true);
    setTimeout(() => {
      setFromUnit(toUnit);
      setToUnit(fromUnit);
      setSwapping(false);
    }, 200);
  }, [fromUnit, toUnit]);

  const handleCopy = useCallback(() => {
    if (formattedResult !== '—') {
      navigator.clipboard.writeText(formattedResult.replace(/,/g, ''));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  }, [formattedResult]);

  return (
    <div className={styles.converter}>
      {/* Input Section */}
      <div className={styles.inputGroup}>
        <label className={styles.label}>{t('from')}</label>
        <div className={styles.inputRow}>
          <input
            id="converter-input"
            type="number"
            className={styles.input}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={t('enterValue')}
            step="any"
          />
          <select
            id="converter-from-unit"
            className={styles.select}
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
          >
            {units.map((u) => (
              <option key={u} value={u}>{tUnits(u)}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Swap Button */}
      <button
        className={`${styles.swapBtn} ${swapping ? styles.swapping : ''}`}
        onClick={handleSwap}
        aria-label={t('swap')}
        id="converter-swap"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      </button>

      {/* Output Section */}
      <div className={styles.inputGroup}>
        <label className={styles.label}>{t('to')}</label>
        <div className={styles.inputRow}>
          <div className={styles.resultDisplay} id="converter-result">
            {formattedResult}
          </div>
          <select
            id="converter-to-unit"
            className={styles.select}
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
          >
            {units.map((u) => (
              <option key={u} value={u}>{tUnits(u)}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Copy Button */}
      <button
        className={`${styles.copyBtn} ${copied ? styles.copied : ''}`}
        onClick={handleCopy}
        id="converter-copy"
      >
        {copied ? (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {t('copied')}
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
            </svg>
            {t('copy')}
          </>
        )}
      </button>

      {/* Quick summary */}
      <div className={styles.summary}>
        <span className={styles.summaryValue}>{value || '0'}</span>
        <span className={styles.summaryUnit}>{tUnits(fromUnit)}</span>
        <span className={styles.summaryEquals}>=</span>
        <span className={styles.summaryValue}>{formattedResult}</span>
        <span className={styles.summaryUnit}>{tUnits(toUnit)}</span>
      </div>
    </div>
  );
}
