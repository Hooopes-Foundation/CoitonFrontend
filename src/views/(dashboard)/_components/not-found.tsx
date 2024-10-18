import { memo } from "react";

const NotFound = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h3>Page Under Construction</h3>
      <p className="max-w-prose text-center">
        This section is currently under development. Please check back soon for
        updates, explore our current listings in the meantime, or go back to
        home page.
      </p>
    </div>
  );
};

export default memo(NotFound);
