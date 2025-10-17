import { Button } from '@/components/ui/button';
import moment from 'moment';
import React from 'react';
import CandidateFeedbackDialog from './CandidateFeedbackDialog';

function CandidateList({ candidateList }) {
  return (
    <div>
      <h2 className="font-bold my-5">
        Candidates ({candidateList?.length})
      </h2>

      {candidateList?.map((candidate, index) => {
        const totalRating =
          candidate?.feedback?.feedback?.rating?.totalRating ?? null;

        const ratingColor =
          totalRating >= 7
            ? 'text-green-600'
            : totalRating >= 4
            ? 'text-yellow-600'
            : 'text-red-600';

        return (
          <div
            key={index}
            className="p-5 flex gap-3 items-center justify-between bg-white rounded-lg"
          >
            <div className="flex items-center gap-5">
              <h2 className="bg-primary p-3 px-4 font-bold text-white rounded-full">
                {candidate?.userName?.[0] || '?'}
              </h2>
              <div>
                <h2 className="font-bold">{candidate?.userName}</h2>
                <h2 className="text-sm text-gray-500">
                  Completed On:{' '}
                  {moment(candidate?.created_at).format('MMM DD YYYY')}
                </h2>
              </div>
            </div>

            <div className="flex gap-3 items-center">
              <h2 className={ratingColor}>
                {totalRating !== null ? `${totalRating}/10` : 'N/A'}
              </h2>
              <CandidateFeedbackDialog candidate={candidate} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CandidateList;
