import React from 'react';
import HeroLetter from '@/components/HeroLetter';
import TimetableClasses from '@/components/TimetableClasses';
import Spellbook from '@/components/Spellbook';
import Credentials from '@/components/Credentials';
import OwlPostForm from '@/components/OwlPostForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <main id="main-content">
        <HeroLetter />
        <hr className="section-divider scroll-reveal" />
        <TimetableClasses />
        <hr className="section-divider scroll-reveal" />
        <Spellbook />
        <hr className="section-divider scroll-reveal" />
        <Credentials />
        <hr className="section-divider scroll-reveal" />
        <OwlPostForm />
      </main>
      <Footer />
    </>
  );
}
