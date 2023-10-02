import Modal from '@/common/Modal';
import { useVerifyEmailQuery } from '@/store/verification/verify-api';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Verify = () => {
    const [message, setMessage] = useState<string>('');
    const [isVerified, setIsVerified] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const router = useRouter();
    const token = router.query.token;
    const { data, error } = useVerifyEmailQuery(token);

    useEffect(() => {
        if (error) {
            setMessage('Email verification failed.');
        } else if (data) {
            if (data.message === 'email verified successfully') {
                setMessage('Email verified successfully!');
                setIsVerified(true);
                setIsModalOpen(true);
            } else {
                setMessage('Email verification failed.');
            }
        }
    }, [data, error]);

    const closeModal = () => {
        setIsModalOpen(false);
        // Redirect to the home or login page here
        // Example: 
        router.push('/login');
    };

    return (
        <div>
            <h1>Email Verification</h1>
            <p>{message}</p>

            {isModalOpen && (
                <Modal onClose={closeModal}>
                    <div>
                        <p>Your account has been verified successfully!</p>
                        <button onClick={closeModal}>Close</button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default Verify;
