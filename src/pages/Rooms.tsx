import React, { useState, useMemo } from 'react';
import { Navbar } from '@/components/dashboard/Navbar';
import { SearchFilters } from '@/components/SearchFilters';
import { StudyRoomGrid } from '@/components/StudyRoomGrid';
import { Pagination } from '@/components/Pagination';
import { ResultsPerPage } from '@/components/ResultsPerPage';
import { CreateRoomModal } from '@/components/CreateRoomModal';
import { StudyRoom } from '@/components/StudyRoomCard';
import { FilterOptions } from '@/components/FiltersModal';
import { useRooms } from '@/hooks/useRooms';
import { useNavigate } from 'react-router-dom';

const Index: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    subject: [],
    level: [],
    status: [],
    participants: 'all'   
  });

  // Mock data for study rooms
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(6);

  const { data, isLoading, isError } = useRooms(currentPage, resultsPerPage);
  console.log('Rooms data:', data);

  // Defensive: data may be undefined/null
  const studyRooms: StudyRoom[] = useMemo(() => {
    if (!data || !Array.isArray(data.data)) {
      console.warn('Rooms data is not an array:', data);
      return [];
    }
    return data.data.map((room: any) => {
      const nextSession = Array.isArray(room.studySessions)
        ? room.studySessions.find((s: any) => s.status === 'scheduled')
        : undefined;
      const activeSession = Array.isArray(room.studySessions)
        ? room.studySessions.find((s: any) => s.status === 'active')
        : undefined;
      // Determine status based on nextSession's start time
      let status: 'active' | 'scheduled' = 'scheduled';
      let startsIn: string | undefined = nextSession ? nextSession.start_time : undefined;
      if (activeSession) {
        status = 'active';
      } else if (nextSession && startsIn) {
        const now = new Date();
        const startDate = new Date(startsIn.replace(' ', 'T'));
        if (startDate > now) {
          status = 'scheduled';
        } else {
          status = 'active';
        }
      }
      const participantsCurrent = (status === 'active'
        ? activeSession?.members?.length
        : nextSession?.members?.length) || 0;
      return {
        id: room.id,
        title: room.name,
        host: 'TBD',
        description: room.description,
        subject: room.subject,
        level: room.level,
        participants: {
          current: participantsCurrent,
          max: room.max_members,
        },
        status, // 'active' if session is ongoing, 'scheduled' if in the future
        timeRemaining: status === 'active' ? 'In progress' : undefined,
        startsIn,
        hostInitial: 'T',
        hostColor: 'rgba(150,45,255,1)',
      };
    });
  }, [data]);

  const filteredRooms = useMemo(() => {
    let rooms = studyRooms;
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      rooms = rooms.filter(room =>
        room.title.toLowerCase().includes(query) ||
        room.subject.toLowerCase().includes(query) ||
        room.host.toLowerCase().includes(query) ||
        room.description.toLowerCase().includes(query)
      );
    }
    if (filters.subject.length > 0) {
      rooms = rooms.filter(room => filters.subject.includes(room.subject));
    }
    if (filters.level.length > 0) {
      rooms = rooms.filter(room => filters.level.includes(room.level));
    }
    if (filters.status.length > 0) {
      rooms = rooms.filter(room =>
        filters.status.some(status => status.toLowerCase() === room.status.toLowerCase())
      );
    }
    if (filters.participants === 'available') {
      rooms = rooms.filter(room => room.participants.current < room.participants.max);
    } else if (filters.participants === 'full') {
      rooms = rooms.filter(room => room.participants.current >= room.participants.max);
    }
    return rooms;
  }, [searchQuery, filters, studyRooms]);

  const paginatedRooms = useMemo(() => {
    const startIndex = (currentPage - 1) * resultsPerPage;
    return filteredRooms.slice(startIndex, startIndex + resultsPerPage);
  }, [filteredRooms, currentPage, resultsPerPage]);

  const totalPages = Math.ceil(filteredRooms.length / resultsPerPage);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleApplyFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleClearAll = () => {
    setSearchQuery('');
    setFilters({
      subject: [],
      level: [],
      status: [],
      participants: 'all'
    });
    setCurrentPage(1);
  };

  // Fix join handler to use studyRooms
  const navigate = useNavigate();
  const handleJoinRoom = (roomId: string) => {
    navigate(`/study-room/${roomId}`);
  };

  const handleCreateRoom = () => {
    setIsCreateModalOpen(true);
  };

  const handleMatchingPage = () => {
    setIsCreateModalOpen(false);
    alert('Redirecting to matching page...');
  };

  const handleInviteConnection = () => {
    setIsCreateModalOpen(false);
    alert('Opening invite connections form...');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleResultsPerPageChange = (value: number) => {
    setResultsPerPage(value);
    setCurrentPage(1);
  };

  return (
    <div className="bg-white overflow-hidden min-h-screen">
      <div className="bg-white flex w-full flex-col items-center pb-8">
        <Navbar />
        <main className="flex w-full max-w-[1173px] flex-col mt-[70px] px-4">
          {/* Title and Create Button Section */}
          <section className="flex w-full items-stretch gap-5 flex-wrap justify-between">
            <div className="flex flex-col items-stretch">
              <h1 className="text-[rgba(32,32,32,1)] text-2xl font-semibold">
                Study Rooms
              </h1>
              <p className="text-[rgba(126,126,126,1)] text-sm font-normal mt-[9px]">
                Join active study sessions or create your own
              </p>
            </div>
            <button 
              onClick={handleCreateRoom}
              className="flex flex-row items-center justify-center gap-2 px-6 py-3 rounded-xl shadow-md bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white text-base font-semibold hover:from-violet-700 hover:to-fuchsia-600 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-violet-400 max-md:px-5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              <span>Create Study Room</span>
            </button>
          </section>

          {/* Search and Filters */}
          <div className="w-full mt-8">
            <SearchFilters 
              onSearch={handleSearch}
              onClearAll={handleClearAll}
              onApplyFilters={handleApplyFilters}
              filters={filters}
              setFilters={setFilters}
              className="w-full"
            />
            {/* Place filter chips or active filters here, under the search bar and buttons */}
            {/* Example: */}
            {((filters.subject.length > 0) || (filters.level.length > 0) || (filters.status.length > 0) || (filters.participants !== 'all')) && (
              <div className="flex flex-wrap gap-2 mt-3">
                {filters.subject.map(subj => (
                  <span key={subj} className="bg-violet-100 text-violet-700 px-2 py-1 rounded text-xs font-semibold">{subj}</span>
                ))}
                {filters.level.map(level => (
                  <span key={level} className="bg-fuchsia-100 text-fuchsia-700 px-2 py-1 rounded text-xs font-semibold">{level}</span>
                ))}
                {filters.status.map(status => (
                  <span key={status} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-semibold">{status}</span>
                ))}
                {filters.participants !== 'all' && (
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">{filters.participants}</span>
                )}
              </div>
            )}
          </div>

          {/* Results Header */}
          <section className="flex w-full items-stretch gap-5 flex-wrap justify-between mt-8">
            <div className="flex items-stretch gap-[13px] my-auto">
              <h2 className="text-[rgba(32,32,32,1)] text-lg font-semibold grow">
                Available Rooms
              </h2>
              <div className="text-[rgba(126,126,126,1)] text-xs font-normal my-auto">
                {filteredRooms.length} rooms found
              </div>
            </div>
            <ResultsPerPage 
              value={resultsPerPage}
              onChange={handleResultsPerPageChange}
            />
          </section>

          {/* Study Rooms Grid */}
          <StudyRoomGrid 
            rooms={paginatedRooms}
            onJoinRoom={handleJoinRoom}
            className="mt-6"
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              totalResults={filteredRooms.length}
              resultsPerPage={resultsPerPage}
              className="mt-8"
            />
          )}
        </main>
      </div>

      {/* Create Room Modal */}
      <CreateRoomModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onMatchingPage={handleMatchingPage}
        onInviteConnection={handleInviteConnection}
      />
    </div>
  );
};

export default Index;
