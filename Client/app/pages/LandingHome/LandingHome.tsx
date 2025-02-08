import React, { Suspense } from 'react';
import SearchMenu from "@/app/components/Main/SearchMenu/SearchMenu";
import PropertyCard from "@/app/components/Elements/PropertyCard/PropertyCard";
import PropertySection from "@/app/components/Sections/PropertySection/PropertySection";
import MainPage from "@/app/components/MainPage/MainPage";

import Hero from "@/app/components/Main/Hero/Hero";
import ShortAboutSection from '@/app/components/Sections/ShortAboutSection/ShortAboutSection';
import CitiesSection from '@/app/components/Sections/CitiesSection/CitiesSection';
import TestimonialSection from '@/app/components/Sections/TestimonialSection/TestimonialSection';
import { getLandingConfig } from '@/app/services/commonService';
import PostsSection from '@/app/components/Sections/PostsSection/PostsSection';


async function fetchLandingConfig(slug: string) {
    const response = await getLandingConfig(1);
    if (response.success && response.data) {
        // cachedPropertySlug = slug
        const config = response.data.config;
        return config;
    }
    else {
        return null;
    }
}


async function LandingHome() {
  
  let landingConfig = await fetchLandingConfig("landing");

  console.log("landingConfig", landingConfig)
  return (
    <>
      <Hero appConfig={landingConfig} />
      <SearchMenu />
      <ShortAboutSection appConfig={landingConfig}/>
      <CitiesSection appConfig={landingConfig}/>
      <Suspense fallback={<div>Loading search results...</div>}>
        <PropertySection />
      </Suspense>
      <TestimonialSection appConfig={landingConfig}/>
      <PostsSection/>
      {/* <MainPage /> */}
    </>
  )
}

export default LandingHome