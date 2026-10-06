import type { ReactNode } from "react";

type CardProps = {
    title: string;
    actions?: ReactNode;
    children: ReactNode;
};

export function Card({ title, actions, children }: CardProps) {
    return (
        <article className="card">
            <header className="card_header">
                <h2>{title}</h2>
                {actions}
            </header>
            <div className="card__body">{children}</div>
        </article>
    );
}