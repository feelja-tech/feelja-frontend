import { useRouter } from "next/router";

export function useOnError(): (err?) => void {
  const router = useRouter();

  return (err?) => router.push(`/error?error=${err}`, "/error");
}

export default useOnError;
