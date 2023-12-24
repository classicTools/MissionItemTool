declare module "*.png" {
	const value: any;
	export = value;
 }
 declare module "*.svg" {
	import { FC, SVGProps } from "react";
	const content: FC<SVGProps<SVGElement>>;
	export default content;
 }