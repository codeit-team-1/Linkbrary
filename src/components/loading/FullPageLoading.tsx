export const FullPageLoading = () => {
  const SpanStyle =
    'relative top-[30px] inline-block text-[2rem] text-primary sm:text-[4rem]';

  return (
    <article className="fixed top-0 bottom-0 left-0 right-0 bg-gray-500 bg-opacity-60 flex font-extrabold justify-center items-center z-50 shadow-['0 1px 0 #CCC, 0 2px #CCC, 0 3px #CCC, 0 4px #CCC, 0 5px #CCC, 0 6px transparent, 0 7px transparent, 0 8px transparent, 0 9px transparent, 0 50px 25px rgba(0, 0, 0, .4)'] select-none">
      <span className={`${SpanStyle} animate-bounce10`}>L</span>
      <span className={`${SpanStyle} animate-bounce20`}>i</span>
      <span className={`${SpanStyle} animate-bounce30`}>n</span>
      <span className={`${SpanStyle} animate-bounce40`}>k</span>
      <span className={`${SpanStyle} animate-bounce50`}>B</span>
      <span className={`${SpanStyle} animate-bounce60`}>r</span>
      <span className={`${SpanStyle} animate-bounce70`}>a</span>
      <span className={`${SpanStyle} animate-bounce80`}>r</span>
      <span className={`${SpanStyle} animate-bounce90`}>y</span>
    </article>
  );
};
