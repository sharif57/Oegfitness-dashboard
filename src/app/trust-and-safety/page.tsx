import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Container from "@/components/common/Container";

export default function TrustAndSafety() {
  return (
    <div className='min-h-screen bg-white'>
      <Container>
        {/* Header */}
        <div className='flex items-center justify-between mb-8'>
          <div className='flex items-center gap-2'>
            <Link href='/' className='text-gray-600 hover:text-gray-900'>
              <ArrowLeft className='w-5 h-5' />
            </Link>
            <h1 className='text-xl font-semibold'>Overview</h1>
          </div>
          <button className='px-4 py-2 bg-blue-900 text-white rounded-md text-sm hover:bg-blue-800 transition-colors'>
            Edit Profile
          </button>
        </div>

        {/* Terms Content */}
        <div className='space-y-6'>
          <h2 className='text-2xl font-semibold'>Trust & Safety</h2>

          <div className='space-y-4 text-lg text-[#737163]'>
            <p>
              Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae
              orci. Egestas duis id nisl sed ante congue scelerisque. Eleifend
              facilisis aliquet tempus morbi leo sagittis. Pellentesque odio
              amet turpis habitant. Imperdiet tincidunt nisl consectetur
              hendrerit accumsan vehicula imperdiet mattis. Neque a vitae diam
              pharetra duis habitasse convallis luctus pulvinar. Pharetra nunc
              morbi elementum nisl magnis convallis arcu enim tortor. Cursus a
              sed tortor enim mi imperdiet massa donec mauris. Sem morbi morbi
              posuere faucibus. Cras risus ultrices duis pharetra sit porttitor
              elementum sagittis elementum. Ut vitae blandit pulvinar fermentum
              in id sed. At pellentesque non semper eget egestas vulputate id
              volutpat quis. Dolor etiam sodales at elementum mattis nibh quam
              placerat ut. Suspendisse est adipiscing proin et. Leo nisi
              bibendum donec ac non eget euismod suscipit. At ultricies nullam
              ipsum tellus. Non dictum orci at tortor convallis tortor
              suspendisse. Ac duis senectus arcu nullam in suspendisse vitae.
              Tellus interdum enim lorem vel morbi lectus.
            </p>

            <p>
              Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae
              orci. Egestas duis id nisl sed ante congue scelerisque. Eleifend
              facilisis aliquet tempus morbi leo sagittis. Pellentesque odio
              amet turpis habitant. Imperdiet tincidunt nisl consectetur
              hendrerit accumsan vehicula imperdiet mattis. Neque a vitae diam
              pharetra duis habitasse convallis luctus pulvinar. Pharetra nunc
              morbi elementum nisl magnis convallis arcu enim tortor. Cursus a
              sed tortor enim mi malesuada massa donec mauris. Sem morbi morbi
              posuere faucibus. Cras risus ultricies duis pharetra sit porttitor
              elementum sagittis elementum. Ut vitae blandit pulvinar fermentum
              id id sed. At pellentesque non semper eget egestas vulputate id
              vulputat duis. Dolor etiam sodales at elementum mattis nibh quam
              placerat ut. Suspendisse est adipiscing proin et. Leo nisl
              bibendum donec ac non eget euismod suscipit. At ultricies nullam
              ipsum tellus. Non dictum orci at tortor convallis tortor
              suspendisse. Ac duis senectus arcu nullam in suspendisse vitae.
              Tellus interdum enim lorem vel morbi lectus.
            </p>

            <p>
              Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae
              orci. Egestas duis id nisl sed ante congue scelerisque. Eleifend
              facilisis aliquet tempus morbi leo sagittis. Pellentesque odio
              amet turpis habitant. Imperdiet tincidunt nisl consectetur
              hendrerit accumsan vehicula imperdiet mattis. Neque a vitae diam
              pharetra duis habitasse convallis luctus pulvinar. Pharetra nunc
              morbi elementum nisl magnis convallis arcu enim tortor. Cursus a
              sed tortor enim mi malesuada massa donec mauris. Sem morbi morbi
              posuere faucibus. Cras risus ultricies duis pharetra sit porttitor
              elementum sagittis elementum. Ut vitae blandit pulvinar fermentum
              id id sed. At pellentesque non semper eget egestas vulputate id
              vulputat duis. Dolor etiam sodales at elementum mattis nibh quam
              placerat ut. Suspendisse est adipiscing proin et. Leo nisl
              bibendum donec ac non eget euismod suscipit. At ultricies nullam
              ipsum tellus. Non dictum orci at tortor convallis tortor
              suspendisse. Ac duis senectus arcu nullam in suspendisse vitae.
              Tellus interdum enim lorem vel morbi lectus.
            </p>
          </div>

          {/* Edit Button */}
          <div className='flex justify-end pt-4'>
            <Link href={"/terms-and-conditions/terms-and-conditions-edit"}>
              <button className='px-36 py-4 rounded-full bg-blue-900 text-lg font-semibold text-white hover:bg-blue-800 transition-colors'>
                Edit
              </button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
