import {
  Education,
  Achievement,
  Project,
  Opening,
  Membership,
  Post,
  Application,
  Invitation,
  GroupChatMembership,
  User,
  GroupChatMessage,
  Chat,
  Message,
  GroupChat,
  Comment,
  OrganizationMembership,
  Organization,
  ProjectBookmark,
  PostBookmark,
  OpeningBookmark,
} from '.';

export const initialEducation: Education = {
  university: '',
  degree: '',
  description: '',
};

export const initialAchievement: Achievement = {
  id: '',
  title: '',
  skills: [],
};

export const initialUser: User = {
  id: '',
  tags: [],
  email: '',
  name: '',
  profilePic: '',
  coverPic: '',
  username: '',
  phoneNo: '',
  bio: '',
  title: '',
  tagline: '',
  education: [],
  achievements: [],
  followers: [],
  following: [],
  memberships: [],
  posts: [],
  projects: [],
  noFollowers: 0,
  noFollowing: 0,
  active: true,
  isFollowing: false,
  passwordChangedAt: new Date(),
  lastViewed: [],
  isVerified: false,
  isOrganization: false,
};

export const initialProject: Project = {
  id: '',
  slug: '',
  userID: '',
  title: '',
  tagline: '',
  coverPic: '',
  description: '',
  page: '',
  user: initialUser,
  likedBy: [],
  comments: [],
  noLikes: 0,
  noShares: 0,
  noComments: 0,
  createdAt: new Date(),
  tags: [],
  category: '',
  memberships: [],
  openings: [],
  hashes: [],
  isPrivate: false,
  views: 0,
  privateLinks: [],
  links: [],
};

export const initialOpening: Opening = {
  id: '',
  projectID: '',
  project: initialProject,
  userID: '',
  user: initialUser,
  title: '',
  description: '',
  applications: [],
  noOfApplications: 0,
  tags: [],
  active: false,
  createdAt: new Date(),
};

export const initialMembership: Membership = {
  id: '',
  projectID: '',
  project: initialProject,
  userID: '',
  user: initialUser,
  role: '',
  title: '',
  active: false,
  createdAt: new Date(),
};

export const initialPost: Post = {
  id: '',
  userID: '',
  images: [],
  content: '',
  user: initialUser,
  likedBy: [],
  noLikes: 0,
  noShares: 0,
  noComments: 0,
  comments: [],
  postedAt: new Date(),
  tags: [],
  hashes: [],
  edited: false,
  usersTagged: [],
};

export const initialOrganization: Organization = {
  id: '',
  userID: '',
  user: initialUser,
  title: '',
  memberships: [],
  createdAt: new Date(),
};

export const initialOrganizationMembership: OrganizationMembership = {
  id: '',
  organizationID: '',
  organization: initialOrganization,
  userID: '',
  user: initialUser,
  role: '',
  createdAt: new Date(),
};

export const initialComment: Comment = {
  id: '',
  userID: '',
  user: initialUser,
  content: '',
  noLikes: 0,
  createdAt: new Date(),
  likedBy: [],
  postID: '',
  post: initialPost,
  projectID: '',
  project: initialProject,
};

export const initialApplication: Application = {
  id: '',
  openingID: '',
  opening: initialOpening,
  userID: '',
  user: initialUser,
  projectID: '',
  project: initialProject,
  status: 0,
  content: '',
  resume: '',
  links: [],
  createdAt: new Date(),
};

export const initialMessage: Message = {
  id: '',
  content: '',
  chatID: '',
  chat: null,
  userID: '',
  user: initialUser,
  createdAt: new Date(),
  read: false,
  postID: '',
  post: initialPost,
  projectID: '',
  project: initialProject,
  messageID: '',
  message: null,
};

export const initialGroupChatMessage: GroupChatMessage = {
  id: '',
  content: '',
  chatID: '',
  chat: null,
  userID: '',
  user: initialUser,
  createdAt: new Date(),
  read: false,
  postID: '',
  post: initialPost,
  projectID: '',
  project: initialProject,
  messageID: '',
  message: null,
};

export const initialChat: Chat = {
  id: '',
  title: '',
  description: '',
  createdByID: '',
  createdBy: initialUser,
  acceptedByID: '',
  acceptedBy: initialUser,
  createdAt: new Date(),
  messages: [],
  latestMessageID: '',
  latestMessage: initialMessage,
  lastReadMessageByAcceptingUserID: '',
  lastReadMessageByCreatingUserID: '',
  accepted: false,
};

export const initialGroupChat: GroupChat = {
  id: '',
  title: '',
  description: '',
  userID: '',
  user: initialUser,
  projectID: '',
  project: initialProject,
  organizationID: '',
  organization: initialOrganization,
  memberships: [],
  createdAt: new Date(),
  messages: [],
  latestMessageID: '',
  latestMessage: initialGroupChatMessage,
};

export const initialInvitation: Invitation = {
  id: '',
  userID: '',
  user: initialUser,
  projectID: '',
  project: initialProject,
  organizationID: '',
  organization: initialOrganization,
  chatID: '',
  chat: initialGroupChat,
  title: '',
  status: 0,
  isRead: false,
  createdAt: new Date(),
};

export const initialGroupChatMembership: GroupChatMembership = {
  id: '',
  userID: '',
  user: initialUser,
  groupChatID: '',
  groupChat: initialGroupChat,
  role: '',
  createdAt: new Date(),
};

export const initialPostBookmark: PostBookmark = {
  id: '',
  title: '',
  userID: '',
  postItems: [],
  createdAt: new Date(),
};

export const initialProjectBookmark: ProjectBookmark = {
  id: '',
  title: '',
  userID: '',
  projectItems: [],
  createdAt: new Date(),
};

export const initialOpeningBookmark: OpeningBookmark = {
  id: '',
  title: '',
  userID: '',
  openingItems: [],
  createdAt: new Date(),
};
