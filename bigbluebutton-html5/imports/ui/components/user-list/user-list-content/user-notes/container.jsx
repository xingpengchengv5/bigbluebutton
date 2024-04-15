import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import NotesService from '/imports/ui/components/notes/service';
import lockContextContainer from '/imports/ui/components/lock-viewers/context/container';
import UserNotes from './component';
import { layoutSelectInput, layoutDispatch } from '../../../layout/context';
import UserNotesContainerGraphql from '../../user-list-graphql/user-list-content/user-notes/component';

const UserNotesContainer = (props) => {
  const sidebarContent = layoutSelectInput((i) => i.sidebarContent);
  const { sidebarContentPanel } = sidebarContent;
  const layoutContextDispatch = layoutDispatch();
  return <UserNotes {...{ layoutContextDispatch, sidebarContentPanel, ...props }} />;
};

lockContextContainer(withTracker(({ userLocks }) => {
  const shouldDisableNotes = userLocks.userNotes;
  return {
    unread: NotesService.hasUnreadNotes(),
    disableNotes: shouldDisableNotes,
    isPinned: NotesService.isSharedNotesPinned(),
  };
})(UserNotesContainer));

export default UserNotesContainerGraphql;
