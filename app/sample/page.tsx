'use client'
import { FileUpload } from '@/components/ui/file-upload'
import { LoaderThree } from '@/components/ui/loader';
import React, { useState } from 'react'
import Tesseract from 'tesseract.js';

export default function Page() {
    const [image, setImage] = useState<string | null>(null);
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);

    const handleImageUpload = (files: File[]) => {
        const file = files[0];
        if (!file) return;
        setImage(URL.createObjectURL(file));

        setLoading(true);
        Tesseract.recognize(file, 'eng+hin', {
            logger: (m) => console.log(m),
        }).then(({ data: { text } }) => {
            setText(text);
            setLoading(false);
        });
    };

    return (
        <>
            <h1 className="text-5xl text-center border-b my-6 pb-3">Image to Text Converter</h1>
            <div className='grid  mt-6 md:grid-cols-2 grid-cols-1 '>
                <div className="fileuploader">
                    <FileUpload onChange={handleImageUpload} />
                </div>
                <div className="textExtractor border-l">
                    <h1 className='md:text-5xl text-4xl pb-5 border-b text-center'>Your Extracted Text </h1>
                    {loading ?
                        <div className='flex justify-center items-center min-h-50'>
                            <LoaderThree />
                        </div>
                        : <pre className="p-4">{text}</pre>}

                </div>
            </div>
            <hr />
            <section className="max-w-4xl mx-auto px-4 space-y-8 py-12 text-gray-800 dark:text-gray-200">
                <h2 className="text-3xl font-bold text-center">Free Online OCR - Convert Image to Text</h2>

                <p>
                    Our powerful image-to-text converter uses the latest Optical Character Recognition (OCR) technology to extract clean, readable text from any image. Whether youre scanning documents, photos, handwritten notes, or screenshots, our tool makes it easy to digitize text content instantly — no manual typing required.
                </p>

                <p>
                    The best part? Its completely free and requires no login. Just upload an image and watch the magic happen. The extracted text appears in seconds, which you can copy, edit, or save for later use. This makes it an essential tool for students, professionals, and content creators who often deal with physical or printed text materials.
                </p>

                <p>
                    Our OCR engine supports multiple languages including English and Hindi, allowing users across India and beyond to process documents in their native script. This is especially useful for reading Hindi books, posters, old certificates, or converting government-issued documents into digital format.
                </p>

                <p>
                    Need to extract data from a bill, receipt, ID card, or visiting card? Our tool can handle all that and more. With accurate text detection and formatting retention, it ensures your extracted content is not just readable — but usable as-is. Even poorly lit or slightly blurred images can still give decent results.
                </p>

                <p>
                    We built this tool with accessibility and simplicity in mind. It works smoothly on desktops, laptops, and mobile devices. Theres no complicated setup or configuration needed — just upload an image and get your text. And since its browser-based, you dont have to download or install any software.
                </p>

                <p>
                    Apart from English and Hindi, we plan to add support for more Indian languages like Marathi, Bengali, Tamil, and Urdu in the future. This makes our OCR app ideal for diverse use-cases such as archiving local documents, extracting poetry or quotes from posters, and digitizing regional literature.
                </p>

                <p>
                    Whether youre working on assignments, managing business documents, or translating content, this image-to-text tool saves time and boosts productivity. Its also a great resource for accessibility — helping visually impaired users to extract and convert printed material into readable digital content.
                </p>

                <div className="border-t pt-6">
                    <h3 className="text-2xl font-semibold mb-2">🔑 Popular Use Cases:</h3>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Scan notes or textbooks for digital archiving</li>
                        <li>Extract content from images, posters, and flyers</li>
                        <li>Get text from PDF snapshots or screenshots</li>
                        <li>Read handwritten letters or documents</li>
                        <li>Copy printed quotes, poetry, or headlines</li>
                        <li>Convert regional language documents to editable text</li>
                    </ul>
                </div>

                <p className="pt-4">
                    Start using this smart, fast, and free OCR service today. Upload your image, extract your text, and get things done faster — without the hassle of manual typing. Welcome to the future of digital text extraction.
                </p>
            </section>

        </>



    )
}
