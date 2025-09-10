import type { SVGProps } from 'react';

type SvgIcon = React.FC<SVGProps<SVGSVGElement>>;
interface Props {
  icon: string;
}

const icons = import.meta.glob('/src/assets/icons/*.svg', {
  eager: true,
  import: 'default',
  query: '?react',
}) as Record<string, SvgIcon>;

const Icon = ({ icon }: Props) => {
  const Icon = icons[`/src/assets/icons/icon-${icon}.svg`];
  return Icon ? <Icon /> : null;
};

export default Icon;
