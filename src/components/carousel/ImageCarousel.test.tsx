// ImageCarousel.test.tsx
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ImageCarousel } from './ImageCarousel';

const IMAGES = [
  { src: '/a.jpg', alt: 'A', title: 'A title', description: 'A desc' },
  { src: '/b.jpg', alt: 'B', title: 'B title', description: 'B desc' },
  { src: '/c.jpg', alt: 'C', title: 'C title', description: 'C desc' },
];

function getActiveDotIndex() {
  const dots = screen.queryAllByRole('button', { name: /Go to slide/i });
  return dots.findIndex((d) => d.className.includes('scale-125'));
}

describe('ImageCarousel', () => {
  beforeEach(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('renders empty state when no images', () => {
    render(<ImageCarousel images={[]} />);
    expect(screen.getByText(/No images to display/i)).toBeInTheDocument();
  });

  test('renders images and dots/arrows by default', () => {
    render(<ImageCarousel images={IMAGES} />);
    expect(getActiveDotIndex()).toBe(0);

    expect(screen.getByAltText('A')).toBeInTheDocument();
    expect(screen.getByAltText('B')).toBeInTheDocument();
    expect(screen.getByAltText('C')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /Previous image/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Next image/i })).toBeInTheDocument();

    expect(screen.getAllByRole('button', { name: /Go to slide/i })).toHaveLength(3);
  });

  test('clicking Next/Previous changes active slide', async () => {
    render(<ImageCarousel images={IMAGES} />);
    const user = userEvent.setup(); // real timers

    expect(getActiveDotIndex()).toBe(0);

    await user.click(screen.getByRole('button', { name: /Next image/i }));
    expect(getActiveDotIndex()).toBe(1);

    await user.click(screen.getByRole('button', { name: /Next image/i }));
    expect(getActiveDotIndex()).toBe(2);

    await user.click(screen.getByRole('button', { name: /Next image/i }));
    expect(getActiveDotIndex()).toBe(0);

    await user.click(screen.getByRole('button', { name: /Previous image/i }));
    expect(getActiveDotIndex()).toBe(2);
  });

  test('clicking dots jumps to specific slide', async () => {
    render(<ImageCarousel images={IMAGES} />);
    const user = userEvent.setup();

    const dots = screen.getAllByRole('button', { name: /Go to slide/i });
    await user.click(dots[2]);
    expect(getActiveDotIndex()).toBe(2);

    await user.click(dots[1]);
    expect(getActiveDotIndex()).toBe(1);
  });

  test('keyboard navigation (ArrowLeft/ArrowRight) works', () => {
    render(<ImageCarousel images={IMAGES} />);
    expect(getActiveDotIndex()).toBe(0);

    act(() => {
      fireEvent.keyDown(window, { key: 'ArrowRight' });
    });
    expect(getActiveDotIndex()).toBe(1);

    act(() => {
      fireEvent.keyDown(window, { key: 'ArrowLeft' });
    });
    expect(getActiveDotIndex()).toBe(0);
  });

  test('autoplay advances slides on interval', () => {
    jest.useFakeTimers();

    render(<ImageCarousel images={IMAGES} autoplayInterval={2000} />);
    expect(getActiveDotIndex()).toBe(0);

    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(getActiveDotIndex()).toBe(1);

    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(getActiveDotIndex()).toBe(2);
  });

  test('autoplay pauses on mouse enter and resumes on mouse leave', async () => {
    jest.useFakeTimers();

    const { container } = render(<ImageCarousel images={IMAGES} autoplayInterval={1000} />);
    const carouselContainer = container.firstChild as HTMLElement;

    expect(getActiveDotIndex()).toBe(0);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(getActiveDotIndex()).toBe(1);

    const dots = screen.getAllByRole('button', { name: /Go to slide/i });
    act(() => {
      fireEvent.click(dots[0]);
    });
    expect(getActiveDotIndex()).toBe(0);

    act(() => {
      fireEvent.mouseEnter(carouselContainer);
    });

    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(getActiveDotIndex()).toBe(0);

    act(() => {
      fireEvent.mouseLeave(carouselContainer);
    });

    await act(async () => {
      jest.advanceTimersByTime(0);
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(getActiveDotIndex()).toBe(1);
  });

  test('touch swipe left/right navigates slides', () => {
    const { container } = render(<ImageCarousel images={IMAGES} />);
    const carouselContainer = container.firstChild as HTMLElement;

    expect(getActiveDotIndex()).toBe(0);
    act(() => {
      fireEvent.touchStart(carouselContainer, {
        touches: [{ clientX: 200, clientY: 100 }],
        targetTouches: [{ clientX: 200, clientY: 100 }]
      });
    });

    act(() => {
      fireEvent.touchMove(carouselContainer, {
        touches: [{ clientX: 100, clientY: 100 }],
        targetTouches: [{ clientX: 100, clientY: 100 }]
      });
    });

    act(() => {
      fireEvent.touchEnd(carouselContainer, {
        changedTouches: [{ clientX: 100, clientY: 100 }]
      });
    });

    expect(getActiveDotIndex()).toBe(1);

    act(() => {
      fireEvent.touchStart(carouselContainer, {
        touches: [{ clientX: 100, clientY: 100 }],
        targetTouches: [{ clientX: 100, clientY: 100 }]
      });
    });

    act(() => {
      fireEvent.touchMove(carouselContainer, {
        touches: [{ clientX: 200, clientY: 100 }],
        targetTouches: [{ clientX: 200, clientY: 100 }]
      });
    });

    act(() => {
      fireEvent.touchEnd(carouselContainer, {
        changedTouches: [{ clientX: 200, clientY: 100 }]
      });
    });

    expect(getActiveDotIndex()).toBe(0);
  });

  test('touch swipe with insufficient distance does not navigate', () => {
    const { container } = render(<ImageCarousel images={IMAGES} />);
    const carouselContainer = container.firstChild as HTMLElement;

    expect(getActiveDotIndex()).toBe(0);

    act(() => {
      fireEvent.touchStart(carouselContainer, {
        touches: [{ clientX: 200, clientY: 100 }],
        targetTouches: [{ clientX: 200, clientY: 100 }]
      });
    });

    act(() => {
      fireEvent.touchMove(carouselContainer, {
        touches: [{ clientX: 180, clientY: 100 }],
        targetTouches: [{ clientX: 180, clientY: 100 }]
      });
    });

    act(() => {
      fireEvent.touchEnd(carouselContainer, {
        changedTouches: [{ clientX: 180, clientY: 100 }]
      });
    });

    expect(getActiveDotIndex()).toBe(0);
  });

  test('hides arrows/dots when disabled or single image', () => {
    const single = [{ src: '/only.jpg', alt: 'Only' }];
    const { rerender } = render(<ImageCarousel images={single} />);
    expect(screen.queryByRole('button', { name: /Next image/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Go to slide/i })).not.toBeInTheDocument();

    rerender(<ImageCarousel images={IMAGES} showArrows={false} showDots={false} />);
    expect(screen.queryByRole('button', { name: /Next image/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Go to slide/i })).not.toBeInTheDocument();
  });

  test('autoplay continues after user interaction', () => {
    jest.useFakeTimers();

    render(<ImageCarousel images={IMAGES} autoplayInterval={1000} />);
    expect(getActiveDotIndex()).toBe(0);

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(getActiveDotIndex()).toBe(1);

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: /Next image/i }));
    });
    expect(getActiveDotIndex()).toBe(2);


    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(getActiveDotIndex()).toBe(0);
  });

  test('handles edge case with empty touches array', () => {
    const { container } = render(<ImageCarousel images={IMAGES} />);
    const carouselContainer = container.firstChild as HTMLElement;

    expect(getActiveDotIndex()).toBe(0);
    act(() => {
      fireEvent.touchEnd(carouselContainer, {
        changedTouches: []
      });
    });

    expect(getActiveDotIndex()).toBe(0);
  });
});