// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {useCallback, useState} from 'react';
import {FormattedMessage} from 'react-intl';

import type {PreferenceType} from '@mattermost/types/preferences';
import type {UserProfile} from '@mattermost/types/users';

import {Preferences} from 'mattermost-redux/constants';

import SettingItemMax from 'components/setting_item_max';

type Props = {
    user: UserProfile;
    simplifiedView: string;
    updateSection: (section: string) => void;
    actions: {
        savePreferences: (userId: string, preferences: PreferenceType[]) => void;
    };
};

const SimplifiedView = ({user, simplifiedView, updateSection, actions}: Props) => {
    const [enabled, setEnabled] = useState(simplifiedView === 'true');
    const [isSaving, setIsSaving] = useState(false);

    const submitPreference = useCallback(async () => {
        if (enabled === (simplifiedView === 'true')) {
            updateSection('');
            return;
        }

        setIsSaving(true);
        await actions.savePreferences(user.id, [{
            user_id: user.id,
            category: Preferences.CATEGORY_DISPLAY_SETTINGS,
            name: Preferences.SIMPLIFIED_VIEW,
            value: enabled.toString(),
        }]);
        setIsSaving(false);
        updateSection('');
    }, [actions, enabled, simplifiedView, updateSection, user.id]);

    const input = (
        <fieldset key='simplifiedViewSetting'>
            <legend className='form-legend hidden-label'>
                <FormattedMessage
                    id='user.settings.display.simplifiedViewTitle'
                    defaultMessage='Simplified view'
                />
            </legend>
            <div className='checkbox'>
                <label>
                    <input
                        id='simplifiedViewEnabled'
                        type='checkbox'
                        checked={enabled}
                        onChange={(event) => setEnabled(event.currentTarget.checked)}
                    />
                    <FormattedMessage
                        id='user.settings.display.simplifiedViewLabel'
                        defaultMessage='Enable simplified view'
                    />
                </label>
            </div>
            <div className='mt-5'>
                <FormattedMessage
                    id='user.settings.display.simplifiedViewDescription'
                    defaultMessage='Use a simplified version of the interface.'
                />
            </div>
        </fieldset>
    );

    return (
        <SettingItemMax
            title={
                <FormattedMessage
                    id='user.settings.display.simplifiedViewTitle'
                    defaultMessage='Simplified view'
                />
            }
            inputs={[input]}
            submit={submitPreference}
            saving={isSaving}
            updateSection={updateSection}
            disableEnterSubmit={true}
        />
    );
};

export default SimplifiedView;
