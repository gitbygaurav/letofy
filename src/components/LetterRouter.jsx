import { useLoaderData, Navigate } from 'react-router-dom';
import WriteLetter from './WriteLetter';
import PreviewLetter from './PreviewLetter';

export default function LetterRouter() {
  const { type } = useLoaderData();

  switch (type) {
    case 'receive':
      return <WriteLetter />;
    case 'send':
      return <PreviewLetter />;
    default:
      return <Navigate to="/" replace />;
  }
}