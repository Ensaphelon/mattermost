// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';

import type {UserProfile} from '@mattermost/types/users';

import {Preferences} from 'mattermost-redux/constants';

import {renderWithContext, screen, userEvent} from 'tests/react_testing_utils';

import SimplifiedView from './index';

describe('SimplifiedView', () => {
    test('saves the preference for the current user', async () => {
        const savePreferences = jest.fn().mockResolvedValue({data: true});
        const updateSection = jest.fn();
        const user = {id: 'current-user'} as UserProfile;

        renderWithContext(
            <SimplifiedView
                user={user}
                simplifiedView='false'
                updateSection={updateSection}
                actions={{savePreferences}}
            />,
        );

        await userEvent.click(screen.getByRole('checkbox', {name: 'Enable simplified view'}));
        await userEvent.click(screen.getByRole('button', {name: 'Save'}));

        expect(savePreferences).toHaveBeenCalledWith('current-user', [{
            user_id: 'current-user',
            category: Preferences.CATEGORY_DISPLAY_SETTINGS,
            name: Preferences.SIMPLIFIED_VIEW,
            value: 'true',
        }]);
        expect(updateSection).toHaveBeenCalledWith('');
    });
});
