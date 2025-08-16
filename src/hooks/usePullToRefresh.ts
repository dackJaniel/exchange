import { useCallback, useEffect, useRef, useState } from 'react';
import { triggerHapticFeedback } from '@/lib/haptic';

interface UsePullToRefreshOptions {
    onRefresh: () => Promise<void>;
    threshold?: number;
    resistance?: number;
    isEnabled?: boolean;
}

interface PullToRefreshState {
    isRefreshing: boolean;
    pullDistance: number;
    canRefresh: boolean;
}

export const usePullToRefresh = ({
    onRefresh,
    threshold = 80,
    resistance = 2.5,
    isEnabled = true,
}: UsePullToRefreshOptions) => {
    const [state, setState] = useState<PullToRefreshState>({
        isRefreshing: false,
        pullDistance: 0,
        canRefresh: false,
    });

    const touchStartY = useRef<number>(0);
    const lastTouchY = useRef<number>(0);
    const isPulling = useRef<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleTouchStart = useCallback(
        (e: TouchEvent) => {
            if (!isEnabled || state.isRefreshing) return;

            const container = containerRef.current;
            if (!container) return;

            // Only start pull if at the top of the page
            if (window.scrollY === 0 && container.scrollTop === 0) {
                touchStartY.current = e.touches[0].clientY;
                lastTouchY.current = e.touches[0].clientY;
                isPulling.current = true;
            }
        },
        [isEnabled, state.isRefreshing]
    );

    const handleTouchMove = useCallback(
        (e: TouchEvent) => {
            if (!isPulling.current || !isEnabled || state.isRefreshing) return;

            const currentY = e.touches[0].clientY;
            const diffY = currentY - touchStartY.current;

            // Only pull down
            if (diffY > 0) {
                // Prevent default scrolling behavior during pull
                e.preventDefault();

                // Apply resistance
                const pullDistance = Math.max(0, diffY / resistance);
                const canRefresh = pullDistance >= threshold;

                // Trigger haptic feedback when threshold is reached
                if (canRefresh && !state.canRefresh) {
                    triggerHapticFeedback('medium');
                }

                setState(prev => ({
                    ...prev,
                    pullDistance,
                    canRefresh,
                }));

                // Add visual feedback
                if (containerRef.current) {
                    containerRef.current.style.transform = `translateY(${pullDistance}px)`;
                    containerRef.current.style.transition = 'none';
                }
            }

            lastTouchY.current = currentY;
        },
        [isEnabled, state.isRefreshing, state.canRefresh, threshold, resistance]
    );

    const handleTouchEnd = useCallback(async () => {
        if (!isPulling.current || !isEnabled) return;

        isPulling.current = false;

        // Reset transform with animation
        if (containerRef.current) {
            containerRef.current.style.transition = 'transform 0.3s ease-out';
            containerRef.current.style.transform = 'translateY(0px)';
        }

        if (state.canRefresh && !state.isRefreshing) {
            setState(prev => ({ ...prev, isRefreshing: true }));

            // Trigger success haptic feedback when refresh starts
            triggerHapticFeedback('success');

            try {
                await onRefresh();
            } catch (error) {
                console.error('Pull to refresh failed:', error);
                triggerHapticFeedback('error');
            } finally {
                setState({
                    isRefreshing: false,
                    pullDistance: 0,
                    canRefresh: false,
                });
            }
        } else {
            setState(prev => ({
                ...prev,
                pullDistance: 0,
                canRefresh: false,
            }));
        }
    }, [isEnabled, state.canRefresh, state.isRefreshing, onRefresh]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        container.addEventListener('touchstart', handleTouchStart, { passive: false });
        container.addEventListener('touchmove', handleTouchMove, { passive: false });
        container.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchmove', handleTouchMove);
            container.removeEventListener('touchend', handleTouchEnd);
        };
    }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

    return {
        containerRef,
        ...state,
    };
};
