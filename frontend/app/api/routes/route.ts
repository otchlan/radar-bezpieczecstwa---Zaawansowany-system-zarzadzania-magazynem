import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    // First try to read from the project root
    let filePath = path.join(process.cwd(), '..', 'utils', ...params.path);
    
    // If that fails, try reading from within the frontend directory
    if (!fs.existsSync(filePath)) {
      filePath = path.join(process.cwd(), '..', '..', 'utils', ...params.path);
    }
    
    // If that still fails, try a relative path from the current directory
    if (!fs.existsSync(filePath)) {
      filePath = path.join(process.cwd(), 'public', 'data', ...params.path);
    }
    
    if (!fs.existsSync(filePath)) {
      return new NextResponse('File not found', { status: 404 });
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    // Determine content type based on file extension
    const extension = path.extname(filePath).toLowerCase();
    let contentType = 'application/octet-stream';
    
    if (extension === '.geojson') {
      contentType = 'application/json';
    } else if (extension === '.json') {
      contentType = 'application/json';
    }
    
    return new NextResponse(fileContents, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error reading file:', error);
    return new NextResponse('File not found', { status: 404 });
  }
}