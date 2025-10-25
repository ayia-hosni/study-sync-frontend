import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'; // Assuming you use a UI lib or build these
import { SubjectSelector } from './SubjectSelector';
import { StudyScheduler } from './StudyScheduler';
import { StudyPreferences } from './StudyPreferences';

interface FindPartnerDrawerProps {
  open: boolean;
  onClose: () => void;
}

export const FindPartnerDrawer: React.FC<FindPartnerDrawerProps> = ({ open, onClose }) => {
  return (
    <Drawer open={open} onClose={onClose}>
      <DrawerContent className="max-w-md mx-auto">
        <DrawerHeader>
          <DrawerTitle>🧑‍🤝‍🧑 Find a Study Partner</DrawerTitle>
        </DrawerHeader>
        <form className="space-y-6 px-4 pb-6">
          <SubjectSelector />
          <StudyScheduler />
          <StudyPreferences />
        </form>
      </DrawerContent>
    </Drawer>
  );
};
