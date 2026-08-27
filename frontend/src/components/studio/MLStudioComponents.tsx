import React, { useState } from "react";
import { Cpu, Play, Award, Settings, Layers, Sliders, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";

export const MLHyperparameterTuningPanel_1: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 1',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #1</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_2: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 2',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #2</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_3: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 3',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #3</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_4: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 4',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #4</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_5: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 5',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #5</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_6: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 6',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #6</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_7: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 7',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #7</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_8: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 8',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #8</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_9: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 9',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #9</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_10: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 10',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #10</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_11: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 11',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #11</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_12: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 12',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #12</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_13: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 13',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #13</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_14: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 14',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #14</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_15: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 15',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #15</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_16: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 16',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #16</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_17: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 17',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #17</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_18: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 18',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #18</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_19: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 19',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #19</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_20: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 20',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #20</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_21: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 21',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #21</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_22: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 22',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #22</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_23: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 23',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #23</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_24: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 24',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #24</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_25: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 25',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #25</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_26: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 26',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #26</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_27: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 27',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #27</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_28: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 28',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #28</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_29: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 29',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #29</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_30: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 30',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #30</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_31: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 31',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #31</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_32: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 32',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #32</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_33: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 33',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #33</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_34: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 34',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #34</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_35: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 35',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #35</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_36: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 36',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #36</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_37: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 37',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #37</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_38: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 38',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #38</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_39: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 39',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #39</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_40: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 40',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #40</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_41: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 41',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #41</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_42: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 42',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #42</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_43: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 43',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #43</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_44: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 44',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #44</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_45: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 45',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #45</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_46: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 46',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #46</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_47: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 47',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #47</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_48: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 48',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #48</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_49: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 49',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #49</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_50: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 50',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #50</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_51: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 51',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #51</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_52: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 52',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #52</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_53: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 53',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #53</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_54: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 54',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #54</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_55: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 55',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #55</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_56: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 56',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #56</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_57: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 57',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #57</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_58: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 58',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #58</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_59: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 59',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #59</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_60: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 60',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #60</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_61: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 61',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #61</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_62: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 62',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #62</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_63: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 63',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #63</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_64: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 64',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #64</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_65: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 65',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #65</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_66: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 66',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #66</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_67: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 67',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #67</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_68: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 68',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #68</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_69: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 69',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #69</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_70: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 70',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #70</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_71: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 71',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #71</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_72: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 72',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #72</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_73: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 73',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #73</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_74: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 74',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #74</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_75: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 75',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #75</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_76: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 76',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #76</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_77: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 77',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #77</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_78: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 78',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #78</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_79: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 79',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #79</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_80: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 80',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #80</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_81: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 81',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #81</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_82: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 82',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #82</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_83: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 83',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #83</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_84: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 84',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #84</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_85: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 85',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #85</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_86: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 86',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #86</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_87: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 87',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #87</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_88: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 88',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #88</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_89: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 89',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #89</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_90: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 90',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #90</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_91: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 91',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #91</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_92: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 92',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #92</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_93: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 93',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #93</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_94: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 94',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #94</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_95: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 95',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #95</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_96: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 96',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #96</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_97: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 97',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #97</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_98: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 98',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #98</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

export const MLHyperparameterTuningPanel_99: React.FC<{
  algorithmName?: string;
  onTuneComplete?: (config: any) => void;
}> = ({
  algorithmName = 'Random Forest Classifier 99',
  onTuneComplete,
}) => {
  const [nEstimators, setNEstimators] = useState<number>(100);
  const [maxDepth, setMaxDepth] = useState<number>(10);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [isTuning, setIsTuning] = useState<boolean>(false);

  const handleApplyConfig = () => {
    setIsTuning(true);
    setTimeout(() => {
      setIsTuning(false);
      if (onTuneComplete) {
        onTuneComplete({ nEstimators, maxDepth, learningRate });
      }
    }, 500);
  };

  return (
    <div className='card-panel p-5 space-y-4 border border-slate-800 rounded-xl bg-slate-950'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Sliders className='w-4 h-4 text-indigo-400' />
          <h4 className='text-xs font-bold text-slate-200'>Tuner Spec #99</h4>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3 text-xs'>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>N Estimators</label>
          <input type='number' value={nEstimators} onChange={(e) => setNEstimators(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Max Depth</label>
          <input type='number' value={maxDepth} onChange={(e) => setMaxDepth(Number(e.target.value))} className='input-field text-xs' />
        </div>
        <div>
          <label className='block text-[10px] text-slate-400 mb-1'>Learning Rate</label>
          <input type='number' step='0.01' value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className='input-field text-xs' />
        </div>
      </div>
      <button onClick={handleApplyConfig} disabled={isTuning} className='w-full btn-indigo py-2 text-xs font-bold'>
        {isTuning ? 'Applying Hyperparameters...' : 'Apply Tuning Hyperparams'}
      </button>
    </div>
  );
};

