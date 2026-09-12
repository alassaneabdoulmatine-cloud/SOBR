// import { ChevronDown, MoreVertical, Plus, Search, Sparkles } from 'lucide-react';

// type Project = {
//   name: string;
//   date: string;
//   duration: string;
//   thumbnail: string;
// };

// const projects: Project[] = [
//   {
//     name: 'Top 5 Languages',
//     date: '2026-06-04',
//     duration: '01:40',
//     thumbnail: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&q=80',
//   },
//   {
//     name: 'Brayan Video 1',
//     date: '2025-01-18',
//     duration: '01:13',
//     thumbnail: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80',
//   },
// ];

// function Filter({ children }: { children: React.ReactNode }) {
//   return (
//     <button className="flex items-center gap-1 text-sm text-foreground transition-colors hover:text-muted-foreground">
//       {children}
//       <ChevronDown className="size-3.5" />
//     </button>
//   );
// }

// function FeatureCard({ image, title, description }: { image: string; title: string; description: string }) {
//   return (
//     <button
//       className="
//         flex h-31.5 w-90 items-center gap-5
//         rounded-xl bg-muted px-5
//         text-left transition-colors
//         hover:bg-accent
//       "
//     >
//       <div className="flex h-20.5 w-22 shrink-0 items-center justify-center overflow-hidden rounded-lg">
//         <img src={image} alt="" className="h-full w-full object-cover" />
//       </div>

//       <div className="min-w-0">
//         <h3 className="font-heading text-sm font-medium text-foreground">{title}</h3>

//         <p className="mt-1 max-w-52.5 text-sm leading-[1.35] text-muted-foreground">{description}</p>
//       </div>
//     </button>
//   );
// }

// function ProjectCard({ project }: { project: Project }) {
//   return (
//     <div className="group w-58">
//       <button className="relative block h-32.5 w-full overflow-hidden rounded-lg bg-muted text-left">
//         <img
//           src={project.thumbnail}
//           alt=""
//           className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
//         />

//         {/* Clip count */}
//         <span
//           className="
//             absolute left-1.5 top-1.5
//             rounded-full bg-background/95
//             px-2 py-0.5
//             text-xs font-medium
//             text-foreground
//             shadow-sm
//           "
//         >
//           1 Clip
//         </span>

//         {/* Duration */}
//         <span
//           className="
//             absolute bottom-1.5 right-1.5
//             rounded-full bg-foreground/70
//             px-2 py-0.5
//             text-xs font-medium
//             text-background
//             backdrop-blur-sm
//           "
//         >
//           {project.duration}
//         </span>
//       </button>

//       <div className="mt-3 flex items-start justify-between gap-2">
//         <div className="min-w-0">
//           <h3 className="truncate text-sm font-medium text-foreground">{project.name}</h3>

//           <p className="mt-1 text-xs text-muted-foreground">{project.date}</p>
//         </div>

//         <button
//           className="
//             shrink-0 rounded-md p-1
//             text-muted-foreground
//             opacity-0 transition-opacity
//             hover:bg-accent hover:text-foreground
//             group-hover:opacity-100
//           "
//           aria-label={`More options for ${project.name}`}
//         >
//           <MoreVertical className="size-4" />
//         </button>
//       </div>
//     </div>
//   );
// }

// export default function Dashboard() {
//   return (
//     <div className="p-8 w-full">
//       {/* Header */}
//       <header className="flex items-center justify-center p-16 w-full bg-primary rounded-xl">
//         <div className="flex items-center gap-2">
//           <Plus />
//           <span className="text-lg font-heading font-semibold">Create a new video</span>
//         </div>
//       </header>

//       {/* Projects header */}
//       <section className=" flex flex-col gap-4 mt-8">
//         <div>
//           <h1 className="text-xl font-heading font-semibold">Projects</h1>
//         </div>

//         {/* Project grid */}
//         <div className="flex flex-wrap gap-4">
//           {projects.map((project) => (
//             <ProjectCard key={project.name} project={project} />
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }

import { Button } from '~/components/ui/button';
import { FileEdit, MoreHorizontal, MoreVertical, Pencil, Play, Plus, Scissors, Trash } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { useNavigate } from 'react-router';

type ProjectFormat = 'Vertical' | 'Horizontal';

type Project = {
  id: string;
  title: string;
  date: string;
  format: ProjectFormat;
  thumbnailUrl: string;
};

const projects: Project[] = [
  {
    id: '1',
    title: 'Top 5 Languages',
    date: '2 months ago',
    format: 'Vertical',
    thumbnailUrl: '',
  },
  {
    id: '2',
    title: 'Top 5 Languages — Part 2',
    date: '2 months ago',
    format: 'Vertical',
    thumbnailUrl: '',
  },
  {
    id: '3',
    title: 'Abdoul Matine ALASSANE',
    date: '3 months ago',
    format: 'Vertical',
    thumbnailUrl: '',
  },
  {
    id: '4',
    title: "Abdoul Matine ALASSANE's Video",
    date: '3 months ago',
    format: 'Vertical',
    thumbnailUrl: '/images/videos/dashboard.jpg',
  },
  {
    id: '5',
    title: 'julien tarifica video 1',
    date: 'over 1 year ago',
    format: 'Vertical',
    thumbnailUrl: '/images/videos/julien.jpg',
  },
  {
    id: '6',
    title: "Abdoul Matine ALASSANE's Video - Feb 11, 2025",
    date: 'over 1 year ago',
    format: 'Vertical',
    thumbnailUrl: '/images/videos/empty-1.jpg',
  },
  {
    id: '7',
    title: 'Abdoul Matine ALASSANE',
    date: 'over 1 year ago',
    format: 'Vertical',
    thumbnailUrl: '/images/videos/microphone.jpg',
  },
  {
    id: '8',
    title: "Abdoul Matine ALASSANE's Video - 2 sept. 2024",
    date: 'about 2 years ago',
    format: 'Vertical',
    thumbnailUrl: '/images/videos/black-1.jpg',
  },
  {
    id: '9',
    title: 'intro wlz 4',
    date: 'about 2 years ago',
    format: 'Horizontal',
    thumbnailUrl: '/images/videos/intro.jpg',
  },
  {
    id: '10',
    title: "Abdoul Matine ALASSANE's Video",
    date: 'over 2 years ago',
    format: 'Vertical',
    thumbnailUrl: '/images/videos/black-2.jpg',
  },
  {
    id: '11',
    title: 'FbVideo_171197...',
    date: 'over 2 years ago',
    format: 'Vertical',
    thumbnailUrl: '/images/videos/facebook.jpg',
  },
  {
    id: '12',
    title: 'Old project',
    date: 'over 2 years ago',
    format: 'Vertical',
    thumbnailUrl: '/images/videos/black-3.jpg',
  },
];

function ProjectCard({ project }: { project: Project }) {
  const isHorizontal = project.format === 'Horizontal';
  const navigate = useNavigate();
  const goToEditor = () => {
    navigate('/editor');
  };

  return (
    <div
      className={`
        group relative min-w-
        ${isHorizontal ? 'col-span-2' : 'col-span-1'}
      `}
    >
      <div
        className="
          relative
          h-full overflow-hidden
          rounded-xl
          text-left
          transition
          cursor-pointer
        "
        onClick={goToEditor}
      >
        {project.thumbnailUrl ? (
          <img src={project.thumbnailUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full bg-primary">
            <div className="absolute inset-0 flex items-center justify-center">
              <Play className="size-8 text-secondary" />
            </div>
          </div>
        )}

        {/* Dark gradient */}
        <div
          className="
            pointer-events-none
            absolute inset-x-0 bottom-0
            h-28
            bg-linear-to-t
            from-black/70
            to-transparent
          "
        />

        {/* Title */}
        <div className="absolute p-2 bottom-2 w-full">
          <p
            className="
              truncate
              text-sm
              font-medium
              text-secondary
            "
          >
            {project.title}
          </p>

          <p className="text-xs text-secondary/75">{project.date}</p>
        </div>
      </div>

      {/* More */}
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              className="absolute right-2 bottom-4 rounded-full p-2 opacity-0 transition-opacity group-hover:opacity-100 cursor-pointer"
              aria-label="More options"
            >
              <MoreHorizontal className="size-4" />
            </Button>
          }
        />
        <DropdownMenuContent className="w-60 p-2" align="start">
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="w-full cursor-pointer"
              render={
                <Button variant="ghost" size="lg" onClick={goToEditor}>
                  <div className="flex items-center gap-2 justify-start w-full">
                    <Scissors />
                    <span>Edit</span>
                  </div>
                </Button>
              }
            ></DropdownMenuItem>
            <DropdownMenuItem
              className="w-full cursor-pointer"
              render={
                <Button variant="ghost" size="lg">
                  <div className="flex items-center gap-2 justify-start w-full">
                    <Pencil />
                    <span>Rename</span>
                  </div>
                </Button>
              }
            ></DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="w-full cursor-pointer"
              render={
                <Button variant="ghost" size="lg">
                  <div className="flex items-center gap-2 justify-start w-full text-destructive">
                    <Trash />
                    <span>Delete</span>
                  </div>
                </Button>
              }
            ></DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default function VideosPage() {
  return (
    <div className="p-8 w-full">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-xl font-semibold tracking-tight">Projects</h1>

        <Button className="cursor-pointer w-20">
          <Plus className="size-4" />
          New
        </Button>
      </div>

      {/* Videos */}
      <section
        className="
            mt-7
            grid
            grid-cols-10
            auto-rows-57.5
            gap-3
          "
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </section>
    </div>
  );
}
