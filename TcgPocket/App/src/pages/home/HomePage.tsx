import { HeroTitle } from './modules/HomePageHero';
import { FeaturesCards } from './modules/HomePageFeatures';

export function HomePage(): React.ReactElement {
  return (
    <div>
      <HeroTitle />
      <FeaturesCards />
    </div>
  );
}
