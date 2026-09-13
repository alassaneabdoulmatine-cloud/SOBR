import { useProject } from '~/hooks/use-project';
import { useParams } from 'react-router';

export default function EditorPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const { projects } = useProject();
  const project = projects.find((project) => project.id === projectId);
  return <div>welcom to editor page {project?.name}</div>;
}
