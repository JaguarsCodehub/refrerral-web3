'use client'
import { SignUp, useAuth } from '@clerk/nextjs';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const SignUpPage = () => {
    const searchParams = useSearchParams();
    const { isSignedIn, userId } = useAuth();

    useEffect(() => {
        const ref = searchParams.get('ref');

        if (ref) {
            localStorage.setItem('referrerId', ref);
        }
    }, [searchParams]);

    useEffect(() => {
        const assignReferralPoints = async () => {
            const referrerId = localStorage.getItem('referrerId');
            if (isSignedIn && userId && referrerId) {
                await fetch('/api/assign-points', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ referrerId }),
                });
                localStorage.removeItem('referrerId');
            }
        };

        if (isSignedIn) {
            assignReferralPoints();
        }
    }, [isSignedIn, userId]);

    return <SignUp afterSignUpUrl="/" afterSignInUrl="/" />;
};

export default SignUpPage;
