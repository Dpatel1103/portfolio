'use client';

import React, { useEffect, useRef } from 'react';
import { SyllabusProject } from '@/types';

interface ClassSyllabusModalProps {
  syllabus: SyllabusProject | null;
  onClose: () => void;
}

export default function ClassSyllabusModal({ syllabus, onClose }: ClassSyllabusModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (syllabus) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [syllabus]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      // Backdrop click detection
      const rect = dialog.getBoundingClientRect();
      const isInDialog =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      if (!isInDialog) {
        onClose();
      }
    };

    dialog.addEventListener('cancel', handleCancel);
    dialog.addEventListener('click', handleClickOutside);
    return () => {
      dialog.removeEventListener('cancel', handleCancel);
      dialog.removeEventListener('click', handleClickOutside);
    };
  }, [onClose]);

  if (!syllabus) return null;

  return (
    <dialog
      id="syllabus-dialog"
      ref={dialogRef}
      className="syllabus-dialog"
      aria-labelledby="syllabus-title"
      aria-modal="true"
    >
      <div className="syllabus-parchment-wrapper">
        <div className="syllabus-scroll-container" id="syllabus-scroll-container">
          {/* Scroll Top Rod & Header */}
          <div className="syllabus-scroll-header-rod" aria-hidden="true">
            <span className="rod-finial-left">✦</span>
            <span className="rod-title">CURRICULUM SYLLABUS DISPATCH</span>
            <span className="rod-finial-right">✦</span>
          </div>

          <div className="syllabus-header">
            <div className="syllabus-eyebrow" id="syllabus-eyebrow">
              {syllabus.eyebrow}
            </div>
            <button
              type="button"
              className="syllabus-close-btn"
              id="syllabus-close-btn"
              aria-label="Close Syllabus"
              onClick={onClose}
            >
              ✕
            </button>
          </div>

          <div className="syllabus-body">
            <h3 className="syllabus-title" id="syllabus-title">
              {syllabus.title}
            </h3>
            <div className="syllabus-stack" id="syllabus-stack">
              {syllabus.stack}
            </div>
            <p className="syllabus-desc" id="syllabus-desc">
              {syllabus.description}
            </p>
            <div className="syllabus-divider"></div>
            <div className="syllabus-section-heading">Curriculum & Architecture Highlights</div>
            <ul className="syllabus-bullets" id="syllabus-bullets">
              {syllabus.highlights.map((highlight, idx) => (
                <li key={idx}>{highlight}</li>
              ))}
            </ul>
            <div className="syllabus-section-heading" style={{ marginTop: '1.25rem' }}>
              Enchanted Runes & Tooling
            </div>
            <div className="class-tags" id="syllabus-tags">
              {syllabus.tags.map((tag, idx) => (
                <span key={idx} className="class-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Miniature Red Wax Seal in Bottom Corner */}
          <div className="syllabus-wax-seal" aria-hidden="true" title="Official Curriculum Seal">
            <span>D</span>
          </div>
        </div>
      </div>
    </dialog>
  );
}
