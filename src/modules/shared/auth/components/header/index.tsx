interface Props {
  title: string;
  description: string;
}
export const Header: React.FC<Props> = ({ title, description }) => (
  <div className="mb-8">
    <h1 className="text-3xl font-serif font-bold text-stone-900 mb-2">
      {title}
    </h1>
    <p className="text-stone-600 text-sm">{description}</p>
  </div>
);
