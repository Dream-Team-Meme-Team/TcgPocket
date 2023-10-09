import { HeroTitle } from './modules/home-page-hero';
import { FeaturesCards } from './modules/home-page-features';

export function HomePage(): React.ReactElement {
  return (
    <div>
      <HeroTitle />
      <FeaturesCards />
    </div>
  );
}
