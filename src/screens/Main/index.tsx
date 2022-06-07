import './index.scss';

function MainScreen() {
  return (
    <div className="w-full h-full flex flex-col p-2 bg-white">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <span className="text-2xl text-zinc-600">
          Hello<strong>World!</strong>
        </span>
      </div>
    </div>
  );
}

export { MainScreen };
