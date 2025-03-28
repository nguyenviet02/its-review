import Link from 'next/link';

export default function Denied() {
  return (
    <section className="flex flex-col items-center gap-12">
      <h1 className="text-5xl">Access Denied</h1>
      <p className="max-w-2xl text-center text-3xl">
        You are logged in, but you do not have the required access level to view
        this page. Please contact your administrator for assistance.
      </p>
      <Link href="/login" className="text-3xl underline">
        Return to Login Page
      </Link>
    </section>
  );
}
