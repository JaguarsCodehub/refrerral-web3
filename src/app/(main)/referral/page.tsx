'use client'
import { useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';

const ReferralPage = () => {
    const { user } = useUser();
    const [referralLink, setReferralLink] = useState('');

    useEffect(() => {
        if (user) {
            // Generate a unique referral link with a custom structure
            const uniqueCode = user.id; // or use user.username for a more personalized link
            const link = `${window.location.origin}/sign-up?ref=${uniqueCode}`;
            setReferralLink(link);
        }
    }, [user]);

    return (
        <div>
            <h1>Your Referral Link</h1>
            {referralLink && (
                <div className='flex flex-col'>
                    <input type="text" readOnly value={referralLink} />
                    <button onClick={() => navigator.clipboard.writeText(referralLink)}>Copy Link</button>
                </div>
            )}
        </div>
    );
};

export default ReferralPage;
