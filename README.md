## 📄 **Index.tsx - Dashboard Page**

This page is the central hub of the user's dashboard, where they can interact with posts, track habits, and join community activities. The page provides a smooth experience with features like infinite scrolling and content filtering.

---

### 🔑 **Key Features**:

* **Navbar**: A toggleable navigation bar to switch between sections and manage the sidebar.
* **Welcome Section**: A section that welcomes the user and encourages engagement.
* **CreatePostCard**: Lets users create and share new posts with the community.
* **FeedCard**: Displays individual posts, including user posts and habit completions.
* **HabitCard**: Tracks and displays the user's habits, showing streaks and completion messages.
* **Infinite Scroll**: Automatically loads more posts as the user scrolls down.

---

### 📋 **How it Works**:

1. **Infinite Scroll with `useInfinitePosts`**:

   * Fetches posts dynamically as the user scrolls, keeping the feed fresh and engaging.
   * Displays loading spinners when new posts are being fetched.

2. **Filtering Posts**:

   * Users can toggle between different filters: **'All'**, **'Habits'**, and **'Community'**.
   * Filter buttons highlight the active selection for easy navigation.

3. **Interactive Feed**:

   * Posts are displayed with various content types, including user updates and habit completions.
   * Each post contains actions like likes, comments, and user interactions.

---

### ⚙️ **Components in Use**:

* **Navbar**: Contains options for toggling the sidebar and navigation.
* **CreatePostCard**: A form to create a new post.
* **FeedCard**: A card to display user-generated content.
* **HabitCard**: Displays progress for user habits like writing or exercising.
* **StudyRoomsSection**: A sidebar section showing available study rooms (visible on larger screens).

---

### 🚀 **Infinite Scroll**:

* **Dynamic Loading**: New posts automatically load as the user scrolls to the bottom of the feed.
* **Pagination Support**: The system fetches posts in batches (chunks), offering a seamless experience.
* **Optimized Fetching**: The page intelligently fetches posts when the user reaches near the end of the feed.

---

### 💡 **How to Use**:

1. The user interacts with the feed by selecting filters (like **'My Habits'** or **'Community'**).
2. As they scroll, more posts will appear without needing to refresh the page.
3. Users can create new posts using the **CreatePostCard**.
4. Habit progress can be tracked via **HabitCard**.

---

### 🔧 **Tech Stack**:

* **React** for rendering components.
* **Tailwind CSS** for styling.
* **useInfinitePosts** for dynamic data fetching and infinite scroll.
---

### 👤 **Profile.tsx - User Profile Page**

This is the page where users can manage their profiles, see quick stats, track habits, and interact with recent activity.

#### 🔑 **Key Components**:

* **ProfileCard**: Displays user information such as name, email, and activity streak.
* **QuickStats**: Shows stats like membership duration and active subjects.
* **RecentActivity**: A feed showing the latest activities related to the user.
* **HabitsTracker**: Tracks user habits, showing current streaks and progress.
* **ConnectionsList**: Displays a list of study connections, showing their status and subjects.

#### ⚙️ **Features**:

* 🛠️ **Edit Profile**: Update profile information and preferences.
* 📊 **Tabs**: Switch between the 'Profile', 'Habits', and 'Activity' tabs.
* 🏅 **Habit Progress**: Visualize and track habits with streaks.

---

### 🤝 **FindPartner.tsx - Study Partner Finder**

This component helps users find study partners based on subjects, schedules, and study preferences.

#### 🔑 **Key Components**:

* **SubjectSelector**: Allows users to select the subjects they need help with.
* **StudyScheduler**: Lets users select available study times.
* **StudyPreferences**: Collects additional study preferences like learning style.
* **MatchResultModal**: Displays results for matching study partners, including options to join sessions or view details.

#### ⚙️ **Features**:

* 🔍 **Find Partner**: Users can click to find a study partner based on their preferences.
* 🗓️ **Schedule**: Match with study partners based on available time slots.
* 💬 **Modal**: Displays match details and lets users join study sessions or edit preferences.

---

### 🌟 **Overall Features Across Components**

* **Responsive Design**: Each page adapts to mobile and desktop layouts.
* **User Interaction**: Buttons, modals, and inputs allow users to interact with their profiles and other components.
* **State Management**: Use of `useState` and `useEffect` hooks to manage state and effects (like fetching posts or showing modals).