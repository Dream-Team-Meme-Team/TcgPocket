import { useDisclosure } from '@mantine/hooks';
import { PrimaryButton } from '../../../components/buttons/PrimaryButton';
import { DeckBuilderModal } from '../../../components/modals/DeckBuilderModal';
import { useState } from 'react';
import { DeckBuild } from './DeckBuild';
import { BuildDeck } from './BuildDeck';
import { ReviewDeck } from './ReviewDeck';

const modalTitle = ['Pick a Deck Build', 'Add Cards to Deck', 'Review Deck'];

const modalBody = [<DeckBuild />, <BuildDeck />, <ReviewDeck />];

export function DeckBuilderSteps(): React.ReactElement {
    const [opened, { open, close }] = useDisclosure();

    const [activeStep, setActiveStep] = useState<number>(0);

    return (
        <div>
            <PrimaryButton onClick={open}>Add New Deck</PrimaryButton>

            <DeckBuilderModal
                opened={opened}
                close={close}
                title={modalTitle[activeStep]}
                body={modalBody[activeStep]}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
            />
        </div>
    );
}
