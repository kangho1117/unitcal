'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { siteConfig } from '@/lib/siteConfig';
import styles from './page.module.css';

export default function ContactPage() {
  const t = useTranslations('contact');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');

    try {
      // TODO: Replace with actual Formspree endpoint
      // const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });
      // if (!res.ok) throw new Error('Failed');

      // Simulate success for now
      await new Promise((resolve) => setTimeout(resolve, 800));
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="legal-page">
      <h1>{t('title')}</h1>
      <p className={styles.subtitle}>{t('subtitle')}</p>

      <form className={styles.form} onSubmit={handleSubmit} id="contact-form">
        <div className={styles.formGroup}>
          <label htmlFor="contact-name" className={styles.label}>{t('nameLabel')}</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            className={styles.input}
            placeholder={t('namePlaceholder')}
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="contact-email" className={styles.label}>{t('emailLabel')}</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            className={styles.input}
            placeholder={t('emailPlaceholder')}
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="contact-subject" className={styles.label}>{t('subjectLabel')}</label>
          <input
            id="contact-subject"
            name="subject"
            type="text"
            className={styles.input}
            placeholder={t('subjectPlaceholder')}
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="contact-message" className={styles.label}>{t('messageLabel')}</label>
          <textarea
            id="contact-message"
            name="message"
            className={styles.textarea}
            placeholder={t('messagePlaceholder')}
            value={formData.message}
            onChange={handleChange}
            rows={6}
            required
          />
        </div>

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={status === 'sending'}
          id="contact-submit"
        >
          {status === 'sending' ? '...' : t('submitButton')}
        </button>

        {status === 'success' && (
          <p className={styles.success}>{t('successMessage')}</p>
        )}
        {status === 'error' && (
          <p className={styles.error}>{t('errorMessage')}</p>
        )}
      </form>

      <div className={styles.directEmail}>
        <p>{t('directEmail')}</p>
        <a href={`mailto:${siteConfig.contactEmail}`} className={styles.emailLink}>
          {siteConfig.contactEmail}
        </a>
      </div>
    </div>
  );
}
