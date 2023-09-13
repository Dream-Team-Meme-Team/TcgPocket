import { Modal, createStyles } from '@mantine/core';
import { PrimaryButton } from '../buttons/PrimaryButton';
import { defaultGap } from '../../constants/theme';

type DeckBuilderModalProps = {
    opened: boolean;
    close: () => void;
    title: React.ReactNode | string;
    body: React.ReactNode | string;
    activeStep: number;
    setActiveStep: (arg: number) => void;
};

export function DeckBuilderModal(
    props: DeckBuilderModalProps
): React.ReactElement {
    const { classes } = useStyles();

    const handleNextButton = () => {
        if (props.activeStep === 2) {
            console.log('submit');
        } else props.setActiveStep(props.activeStep + 1);
    };

    const handleBackButton = () => {
        if (props.activeStep === 0) {
            props.close();
        } else props.setActiveStep(props.activeStep - 1);
    };

    const backButtonText = props.activeStep === 0 ? 'Close' : 'Back';
    const nextButtonText = props.activeStep === 2 ? 'Submit' : 'Next';

    return (
        <Modal.Root opened={props.opened} onClose={props.close}>
            <Modal.Content>
                <Modal.Header>
                    <Modal.Title> {props.title} </Modal.Title>
                    <Modal.CloseButton />
                </Modal.Header>
                <Modal.Body className={classes.modalBodyContainer}>
                    {props.body}

                    <div className={classes.modalFooterContainer}>
                        <PrimaryButton onClick={handleBackButton}>
                            {backButtonText}
                        </PrimaryButton>
                        <PrimaryButton onClick={handleNextButton}>
                            {nextButtonText}
                        </PrimaryButton>
                    </div>
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>
    );
}

const useStyles = createStyles(() => ({
    modalBodyContainer: {
        display: 'grid',
        gridTemplateRows: 'auto 3rem',
    },

    modalFooterContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',

        gap: defaultGap,
    },
}));
