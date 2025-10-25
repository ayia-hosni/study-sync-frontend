import React from 'react';

interface Connection {
  id: string;
  name: string;
  avatar: string;
  subject: string;
  status: 'online' | 'offline';
}

interface ConnectionsListProps {
  connections: Connection[];
}

export const ConnectionsList: React.FC<ConnectionsListProps> = ({
  connections,
}) => {
  return (
    <section className="bg-card border-border border flex flex-col items-stretch mt-6 p-6 rounded-2xl max-md:max-w-full max-md:px-5 hover:shadow-elegant transition-all duration-300">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-foreground text-lg font-bold">
          Study Connections
        </h3>
        <button className="text-primary text-sm font-semibold hover:text-primary/80 transition-colors">
          View All
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {connections.map((connection) => (
          <article
            key={connection.id}
            className="bg-muted/30 flex items-center gap-4 p-4 rounded-xl hover:bg-muted/50 transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="relative">
              <div className="bg-primary flex w-12 h-12 items-center justify-center text-lg text-primary-foreground font-bold rounded-full">
                {connection.avatar}
              </div>
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card ${
                connection.status === 'online' ? 'bg-green-500' : 'bg-muted-foreground'
              }`} />
            </div>
            <div className="flex-1">
              <h4 className="text-foreground text-sm font-semibold">
                {connection.name}
              </h4>
              <p className="text-muted-foreground text-xs mt-1">
                {connection.subject}
              </p>
            </div>
            <button className="bg-accent text-accent-foreground px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-accent/80 transition-colors">
              Connect
            </button>
          </article>
        ))}
      </div>
    </section>
  );
};