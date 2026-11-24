import { NextRequest, NextResponse } from 'next/server';
import { saveMessage, getMessageCount } from '@/lib/db';
import { sendOwlNotification } from '@/lib/email';
import { OwlPostRequest, OwlPostResponse } from '@/types';

export const dynamic = 'force-dynamic';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export async function GET() {
  try {
    const totalOwls = await getMessageCount();
    return NextResponse.json(
      {
        success: true,
        totalOwls
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : 'Database error';
    console.error('Failed to retrieve owl count:', errMsg);
    return NextResponse.json(
      {
        success: false,
        message: 'Could not retrieve owl count',
        totalOwls: 0
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    let body: OwlPostRequest;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: 'Malformed parchment payload.'
        },
        { status: 400 }
      );
    }

    const { name, email, message, owlType, botcheck } = body;
    const cleanOwlType = typeof owlType === 'string' && owlType.trim() ? owlType.trim() : 'Barn Owl';

    // Honeypot spam check
    if (botcheck) {
      console.warn('✦ [Spam Shield] Bot caught in honeypot. Discarding silently.');
      return NextResponse.json(
        {
          success: true,
          message: '✦ Your owl has taken flight!'
        },
        { status: 200 }
      );
    }

    // Validation
    const errors: string[] = [];
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      errors.push('Sender Name is required.');
    } else if (name.trim().length > 120) {
      errors.push('Sender Name must be under 120 characters.');
    }

    if (!email || typeof email !== 'string' || email.trim().length === 0) {
      errors.push('Return Owl / Email is required.');
    } else if (!EMAIL_REGEX.test(email.trim())) {
      errors.push('Please provide a valid email address.');
    } else if (email.trim().length > 255) {
      errors.push('Email address is too long.');
    }

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      errors.push('Scroll message cannot be empty.');
    } else if (message.trim().length < 3) {
      errors.push('Scroll message must be at least 3 characters.');
    } else if (message.trim().length > 5000) {
      errors.push('Scroll message exceeds the 5,000 character parchment limit.');
    }

    if (errors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: errors.join(' '),
          errors
        },
        { status: 400 }
      );
    }

    // Save to Database
    const cleanData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      owlType: cleanOwlType
    };

    const savedRecord = await saveMessage(cleanData);

    // Send Email Alert asynchronously via Resend
    sendOwlNotification({
      name: cleanData.name,
      email: cleanData.email,
      message: cleanData.message,
      owlType: cleanOwlType,
      id: savedRecord.id,
      createdAt: savedRecord.created_at
    }).catch(emailErr => {
      console.error('Background email alert failed:', emailErr);
    });

    // Get updated total count
    const updatedCount = await getMessageCount();

    const responsePayload: OwlPostResponse = {
      success: true,
      message: '✦ Your owl has taken flight! Devanshi will reply to your return address soon.',
      totalOwls: updatedCount,
      data: {
        id: savedRecord.id,
        createdAt: savedRecord.created_at
      }
    };

    return NextResponse.json(responsePayload, { status: 201 });
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : 'Server error';
    console.error('Error handling owl post:', errMsg);
    return NextResponse.json(
      {
        success: false,
        message: 'The owl encountered a mysterious storm. Please try again or use direct mail.'
      },
      { status: 500 }
    );
  }
}
