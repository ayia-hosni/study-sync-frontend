import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Users, Search } from 'lucide-react';

interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMatchingPage: () => void;
  onInviteConnection: () => void;
}

export const CreateRoomModal: React.FC<CreateRoomModalProps> = ({
  isOpen,
  onClose,
  onMatchingPage,
  onInviteConnection
}) => {
  const [showInviteForm, setShowInviteForm] = React.useState(false);
  const [emails, setEmails] = React.useState('');
  const [roomTitle, setRoomTitle] = React.useState('');
  const [roomSubject, setRoomSubject] = React.useState('');
  const [roomLevel, setRoomLevel] = React.useState('');
  const [selectedUser, setSelectedUser] = React.useState('');
  const [userSelectMode, setUserSelectMode] = React.useState<'dropdown' | 'email'>('dropdown');
  // Mock users for dropdown
  const users = [
    { id: '1', name: 'Sarah Chen' },
    { id: '2', name: 'Mike Johnson' },
    { id: '3', name: 'Emma Davis' },
    { id: '4', name: 'Alex Rivera' },
    { id: '5', name: 'John Smith' },
    { id: '6', name: 'Lisa Wang' }
  ];
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(userSelectMode === 'email' ? '' : userSelectMode.toLowerCase())
  );

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can pass all form data to onInviteConnection or handle here
    onInviteConnection();
    setShowInviteForm(false);
    setEmails('');
    setRoomTitle('');
    setRoomSubject('');
    setRoomLevel('');
    setSelectedUser('');
    setUserSelectMode('dropdown');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">Create Study Room</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p className="text-sm text-muted-foreground text-center mb-6">
            Choose how you'd like to create your study room
          </p>
          <div className="space-y-3">
            {!showInviteForm ? (
              <>
                <Button
                  onClick={() => {
                    window.location.href = 'http://localhost:8081/find-partner';
                  }}
                  className="w-full h-auto p-4 flex flex-col items-center space-y-2 bg-primary hover:bg-primary/90"
                >
                  <Search className="w-6 h-6" />
                  <div className="text-center">
                    <div className="font-semibold">Find Study Partner</div>
                    <div className="text-xs opacity-90">Match with students studying similar topics</div>
                  </div>
                </Button>
                <Button
                  onClick={() => setShowInviteForm(true)}
                  variant="outline"
                  className="w-full h-auto p-4 flex flex-col items-center space-y-2"
                >
                  <Users className="w-6 h-6" />
                  <div className="text-center">
                    <div className="font-semibold">Invite Connections</div>
                    <div className="text-xs text-muted-foreground">Create a room and invite your friends</div>
                  </div>
                </Button>
              </>
            ) : (
              <form onSubmit={handleInviteSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col items-start space-y-1 w-full">
                    <label htmlFor="room-title" className="font-semibold text-xs">Room Title</label>
                    <input
                      id="room-title"
                      type="text"
                      value={roomTitle}
                      onChange={e => setRoomTitle(e.target.value)}
                      placeholder="Title"
                      className="w-full border rounded px-2 py-1 text-xs"
                      required
                    />
                  </div>
                  <div className="flex flex-col items-start space-y-1 w-full">
                    <label htmlFor="room-subject" className="font-semibold text-xs">Subject</label>
                    <input
                      id="room-subject"
                      type="text"
                      value={roomSubject}
                      onChange={e => setRoomSubject(e.target.value)}
                      placeholder="Subject"
                      className="w-full border rounded px-2 py-1 text-xs"
                      required
                    />
                  </div>
                  <div className="flex flex-col items-start space-y-1 w-full">
                    <label htmlFor="room-level" className="font-semibold text-xs">Level</label>
                    <input
                      id="room-level"
                      type="text"
                      value={roomLevel}
                      onChange={e => setRoomLevel(e.target.value)}
                      placeholder="Level"
                      className="w-full border rounded px-2 py-1 text-xs"
                      required
                    />
                  </div>
                  <div className="flex flex-col items-start space-y-1 w-full">
                    <label className="font-semibold text-xs">Invite Method</label>
                    <div className="flex gap-3 mt-1">
                      <label className="flex items-center gap-1 text-xs">
                        <input
                          type="radio"
                          name="userSelectMode"
                          value="dropdown"
                          checked={userSelectMode === 'dropdown'}
                          onChange={() => setUserSelectMode('dropdown')}
                        />
                        Select User
                      </label>
                      <label className="flex items-center gap-1 text-xs">
                        <input
                          type="radio"
                          name="userSelectMode"
                          value="email"
                          checked={userSelectMode === 'email'}
                          onChange={() => setUserSelectMode('email')}
                        />
                        By Email
                      </label>
                    </div>
                    {userSelectMode === 'dropdown' && (
                      <select
                        id="invite-user"
                        value={selectedUser}
                        onChange={e => setSelectedUser(e.target.value)}
                        className="w-full border rounded px-2 py-1 text-xs mt-2"
                        required
                      >
                        <option value="">Select user</option>
                        {filteredUsers.map(user => (
                          <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                      </select>
                    )}
                    {userSelectMode === 'email' && (
                      <input
                        id="invite-emails"
                        type="text"
                        value={emails}
                        onChange={e => setEmails(e.target.value)}
                        placeholder="Emails, comma separated"
                        className="w-full border rounded px-2 py-1 text-xs mt-2"
                        required
                      />
                    )}
                  </div>
                </div>
                <div className="flex gap-2 justify-center mt-2">
                  <Button type="button" variant="outline" size="sm" onClick={() => setShowInviteForm(false)}>
                    Back
                  </Button>
                  <Button type="submit" size="sm" className="bg-primary text-white">
                    Send Invites
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
