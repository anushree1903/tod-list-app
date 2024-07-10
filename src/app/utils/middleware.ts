import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  try {
    console.log('middleware hit!!')
    const isAuth = await localStorage.getItem('access_token');
    if (!isAuth) {
      return NextResponse.redirect(new URL('/login', request.url).toString());
    }
    // NextResponse.next() is used to continue to the next middleware or route handler
    return NextResponse.next();
  } catch (error) {
    console.error(error);
    console.log("middleware error:", error)
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/',
};
