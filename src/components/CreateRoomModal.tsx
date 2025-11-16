import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Users, Search, X } from 'lucide-react';

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
  // changed to multi-select: roomLevel is an array of selected levels
  const ROOM_LEVEL_OPTIONS = ['Beginner', 'Intermediate', 'Advanced'];
  const [roomLevel, setRoomLevel] = React.useState<string[]>([]);
  const [selectedUser, setSelectedUser] = React.useState('');
  const [userSelectMode, setUserSelectMode] = React.useState<'dropdown' | 'email'>('dropdown');
 
  // optional: simple client-side validation message state
  const [validationError, setValidationError] = React.useState<string | null>(null);

  // Mock users for dropdown
  const users = [
    { id: '1', name: 'Sarah Chen' },
    { id: '2', name: 'Mike Johnson' },
    { id: '3', name: 'Emma Davis' },
    { id: '4', name: 'Alex Rivera' },
    { id: '5', name: 'John Smith' },
    { id: '6', name: 'Lisa Wang' }
  ];

  // simple passthrough filter placeholder (keeps UI snappy)
  const filteredUsers = users;

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // validate at least one level selected
    if (roomLevel.length === 0) {
      setValidationError('Please select at least one level.');
      return;
    }
    setValidationError(null);
    onInviteConnection();
    setShowInviteForm(false);
    setEmails('');
    setRoomTitle('');
    setRoomSubject('');
    setRoomLevel([]); // reset multi-select
    setSelectedUser('');
    setUserSelectMode('dropdown');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* Increased modal width and padding for more breathing room */}
      <DialogContent className="sm:max-w-2xl w-full rounded-3xl p-8 bg-white dark:bg-[#0b0b0d] shadow-2xl border border-neutral-100 dark:border-neutral-800">
        <div className="relative">
          

          <DialogHeader className="mb-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-[#6B21A8] to-[#8B5CF6] rounded-2xl">
                <Users className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <DialogTitle className="text-xl font-semibold">Create Study Room</DialogTitle>
                <p className="text-sm text-muted-foreground">Choose how you'd like to create your room</p>
              </div>
            </div>
          </DialogHeader>

          <div className="border-t border-neutral-100 dark:border-neutral-800 my-6" />

          <div className="space-y-6 py-2">
            {!showInviteForm ? (
              <div className="grid gap-4">
                <button
                  onClick={() => { window.location.href = 'http://localhost:8080/find-partner'; }}
                  className="flex items-start gap-4 p-6 rounded-xl bg-gradient-to-r from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-900 border border-neutral-100 dark:border-neutral-800 hover:shadow-lg transition"
                >
                  <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-[#EEF2FF] dark:bg-[#241136]">
                    <Search className="w-6 h-6 text-[#5B21B6]" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-lg">Find Study Partner</div>
                    <div className="text-sm text-muted-foreground">Match with students studying similar topics</div>
                  </div>
                </button>

                <button
                  onClick={() => setShowInviteForm(true)}
                  className="flex items-start gap-4 p-6 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition"
                >
                  <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-[#F0FDF4] dark:bg-[#06321a]">
                    <Users className="w-6 h-6 text-[#059669]" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-lg">Invite Connections</div>
                    <div className="text-sm text-muted-foreground">Create a room and invite your friends</div>
                  </div>
                </button>
              </div>
            ) : (
              <form onSubmit={handleInviteSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-2 w-full">
                    <label htmlFor="room-title" className="font-semibold text-sm">Room Title</label>
                    <input
                      id="room-title"
                      type="text"
                      value={roomTitle}
                      onChange={e => setRoomTitle(e.target.value)}
                      placeholder="Title"
                      className="w-full border rounded-lg px-4 py-3 text-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                      required
                    />
                  </div>

                  <div className="flex flex-col space-y-2 w-full">
                    <label htmlFor="room-subject" className="font-semibold text-sm">Subject</label>
                    <input
                      id="room-subject"
                      type="text"
                      value={roomSubject}
                      onChange={e => setRoomSubject(e.target.value)}
                      placeholder="Subject"
                      className="w-full border rounded-lg px-4 py-3 text-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                      required
                    />
                  </div>

                  <div className="flex flex-col space-y-2 w-full sm:col-span-2">
                    <label htmlFor="room-level" className="font-semibold text-sm">Level (select one or more)</label>
                    <select
                      id="room-level"
                      multiple
                      value={roomLevel}
                      onChange={e => {
                        const opts = Array.from((e.target as HTMLSelectElement).selectedOptions).map(o => o.value);
                        setRoomLevel(opts);
                      }}
                      className="w-full border rounded-lg px-3 py-2 text-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-[#7C3AED] min-h-[120px]"
                    >
                      {ROOM_LEVEL_OPTIONS.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {roomLevel.length === 0 ? (
                        <span className="text-sm text-muted-foreground">No level selected</span>
                      ) : (
                        roomLevel.map(l => (
                          <span key={l} className="text-sm px-3 py-1 bg-[#EEF2FF] dark:bg-neutral-800 rounded-full">{l}</span>
                        ))
                      )}
                    </div>

                    {validationError && (
                      <p className="text-sm text-red-600 mt-2">{validationError}</p>
                    )}
                  </div>

                  <div className="flex flex-col space-y-2 w-full sm:col-span-2">
                    <label className="font-semibold text-sm">Invite Method</label>
                    <div className="flex gap-4 mt-2 items-center">
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="radio"
                          name="userSelectMode"
                          value="dropdown"
                          checked={userSelectMode === 'dropdown'}
                          onChange={() => setUserSelectMode('dropdown')}
                        />
                        Select User
                      </label>
                      <label className="flex items-center gap-2 text-sm">
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
                        className="w-full border rounded-lg px-4 py-3 text-sm mt-3 bg-transparent"
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
                        className="w-full border rounded-lg px-4 py-3 text-sm mt-3 bg-transparent"
                        required
                      />
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center mt-2">
                  <Button type="button" variant="ghost" size="sm" onClick={() => setShowInviteForm(false)}>
                    Back
                  </Button>

                  <div className="flex gap-3">
                    <Button type="button" variant="outline" size="sm" onClick={onClose}>
                      Cancel
                    </Button>
                    <Button type="submit" size="sm" className="bg-[#7C3AED] text-white hover:bg-[#6D28D9] px-6 py-2">
                      Send Invites
                    </Button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
