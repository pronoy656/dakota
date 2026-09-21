'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { 
  Upload, 
  Trash2, 
  Copy, 
  RotateCw, 
  Maximize2, 
  Grid, 
  Sparkles, 
  Download, 
  ShoppingBag, 
  ZoomIn, 
  ZoomOut, 
  Maximize, 
  AlertTriangle, 
  CheckCircle2, 
  Flame, 
  ArrowRight,
  Info,
  Undo,
  HelpCircle
} from 'lucide-react';
import { GANG_SHEET_SIZES, STORE_INFO } from '@/data/storeData';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';

export interface CanvasItem {
  id: string;
  name: string;
  src: string;
  x: number; // in inches
  y: number; // in inches
  width: number; // in inches
  height: number; // in inches
  rotation: number; // degrees
  originalWidthPx: number;
  originalHeightPx: number;
}

interface GangSheetBuilderProps {
  initialHeight?: number;
}

export default function GangSheetBuilderCanvas({ initialHeight = 24 }: GangSheetBuilderProps) {
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();

  const sheetWidthInches = 22; // 22 inches standard roll width
  const [sheetHeightInches, setSheetHeightInches] = useState(initialHeight);
  const [items, setItems] = useState<CanvasItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [showGrid, setShowGrid] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);

  // Dragging / Resizing state
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeCorner, setResizeCorner] = useState<'br' | 'tr' | 'bl' | 'tl' | null>(null);
  const [initialResizeState, setInitialResizeState] = useState<{ x: number; y: number; w: number; h: number; startX: number; startY: number } | null>(null);

  const canvasRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Pricing calculation
  const currentSizeObj = GANG_SHEET_SIZES.find((s) => s.height === sheetHeightInches) || {
    size: `22" x ${sheetHeightInches}"`,
    width: 22,
    height: sheetHeightInches,
    price: Number(((sheetHeightInches / 12) * 7.50).toFixed(2)),
  };

  // Pixels per inch on display canvas (base scale factor)
  const displayPpi = 24 * zoom;

  // Selected item
  const selectedItem = items.find((i) => i.id === selectedId);

  // Calculate DPI of selected item
  const getDpi = (item: CanvasItem) => {
    if (!item.width || item.width === 0) return 300;
    const dpiX = item.originalWidthPx / item.width;
    const dpiY = item.originalHeightPx / item.height;
    return Math.round(Math.min(dpiX, dpiY));
  };

  // Calculate Space utilization percentage
  const totalSheetArea = sheetWidthInches * sheetHeightInches;
  const usedArea = items.reduce((sum, item) => sum + item.width * item.height, 0);
  const utilizationPercent = Math.min(100, Math.round((usedArea / totalSheetArea) * 100));

  // Add initial sample items on first load if empty
  useEffect(() => {
    if (items.length === 0) {
      const sample1: CanvasItem = {
        id: 'sample-1',
        name: 'Camp Life Mountain',
        src: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=600&q=80',
        x: 0.5,
        y: 0.5,
        width: 10,
        height: 10,
        rotation: 0,
        originalWidthPx: 3000,
        originalHeightPx: 3000,
      };

      const sample2: CanvasItem = {
        id: 'sample-2',
        name: 'Wilderness Badge',
        src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
        x: 11.5,
        y: 0.5,
        width: 9.5,
        height: 9.5,
        rotation: 0,
        originalWidthPx: 3200,
        originalHeightPx: 3200,
      };

      const sample3: CanvasItem = {
        id: 'sample-3',
        name: 'Pocket Logo',
        src: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80',
        x: 0.5,
        y: 11.5,
        width: 4,
        height: 4,
        rotation: 0,
        originalWidthPx: 1500,
        originalHeightPx: 1500,
      };

      setItems([sample1, sample2, sample3]);
      setSelectedId('sample-1');
    }
  }, []);

  // Handle image file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const src = event.target?.result as string;
        const img = new window.Image();
        img.onload = () => {
          // Default to ~8 inches or fit
          const originalW = img.width;
          const originalH = img.height;
          const aspectRatio = originalW / originalH;
          
          let targetWidth = 8;
          let targetHeight = 8 / aspectRatio;
          if (targetHeight > 10) {
            targetHeight = 10;
            targetWidth = 10 * aspectRatio;
          }

          const newItem: CanvasItem = {
            id: `item-${Date.now()}-${index}`,
            name: file.name.replace(/\.[^/.]+$/, ''),
            src,
            x: 0.5 + (index * 0.5),
            y: 0.5 + (index * 0.5),
            width: Number(targetWidth.toFixed(2)),
            height: Number(targetHeight.toFixed(2)),
            rotation: 0,
            originalWidthPx: originalW,
            originalHeightPx: originalH,
          };

          setItems((prev) => [...prev, newItem]);
          setSelectedId(newItem.id);
        };
        img.src = src;
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Duplicate item
  const handleDuplicate = () => {
    if (!selectedItem) return;
    const duplicated: CanvasItem = {
      ...selectedItem,
      id: `item-${Date.now()}`,
      x: Math.min(sheetWidthInches - selectedItem.width - 0.2, selectedItem.x + 0.5),
      y: Math.min(sheetHeightInches - selectedItem.height - 0.2, selectedItem.y + 0.5),
    };
    setItems((prev) => [...prev, duplicated]);
    setSelectedId(duplicated.id);
  };

  // Rotate item 90 degrees
  const handleRotate = () => {
    if (!selectedItem) return;
    const newRot = (selectedItem.rotation + 90) % 360;
    // Swap dimensions if rotating 90 or 270
    const newW = selectedItem.height;
    const newH = selectedItem.width;

    setItems((prev) =>
      prev.map((i) =>
        i.id === selectedItem.id
          ? { ...i, rotation: newRot, width: newW, height: newH }
          : i
      )
    );
  };

  // Delete item
  const handleDelete = () => {
    if (!selectedId) return;
    setItems((prev) => prev.filter((i) => i.id !== selectedId));
    setSelectedId(null);
  };

  // Auto-Nest / Auto-Arrange Algorithm (2D Bin Packing Greedy Layout)
  const handleAutoNest = () => {
    if (items.length === 0) return;
    
    // Sort items by height descending
    const sorted = [...items].sort((a, b) => b.height - a.height);
    const padding = 0.35; // inches between items
    let curX = padding;
    let curY = padding;
    let maxRowHeight = 0;

    const nested = sorted.map((item) => {
      // Check if item fits in current row
      if (curX + item.width + padding > sheetWidthInches) {
        // Move to next row
        curX = padding;
        curY += maxRowHeight + padding;
        maxRowHeight = 0;
      }

      const itemX = curX;
      const itemY = curY;

      curX += item.width + padding;
      if (item.height > maxRowHeight) {
        maxRowHeight = item.height;
      }

      return {
        ...item,
        x: Number(itemX.toFixed(2)),
        y: Number(itemY.toFixed(2)),
      };
    });

    // If needed, expand sheet height to fit all items
    const requiredHeight = Math.ceil(curY + maxRowHeight + padding);
    if (requiredHeight > sheetHeightInches) {
      // Find closest standard size or expand
      const nextSize = GANG_SHEET_SIZES.find((s) => s.height >= requiredHeight);
      if (nextSize) {
        setSheetHeightInches(nextSize.height);
      } else {
        setSheetHeightInches(Math.max(requiredHeight, 240));
      }
    }

    setItems(nested);
  };

  // Add Gang Sheet to Cart
  const handleAddToCart = () => {
    if (items.length === 0) {
      alert('Please upload or add at least one design to your gang sheet.');
      return;
    }

    setIsExporting(true);
    setAddedNotice(true);

    const gangSheetTitle = `Custom DTF Gang Sheet (${sheetWidthInches}" x ${sheetHeightInches}")`;
    const representativeImage = items[0]?.src || 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80';

    addToCart({
      id: '7869635854387',
      variantId: `gs-${sheetWidthInches}x${sheetHeightInches}`,
      title: gangSheetTitle,
      variantTitle: `${sheetWidthInches}" x ${sheetHeightInches}"`,
      price: currentSizeObj.price,
      image: representativeImage,
      handle: 'gang-sheet-builder',
      isGangSheet: true,
      gangSheetDetails: {
        size: `${sheetWidthInches}" x ${sheetHeightInches}"`,
        itemsCount: items.length,
        previewUrl: representativeImage,
      },
      quantity: 1,
    });

    setTimeout(() => {
      setIsExporting(false);
      setTimeout(() => setAddedNotice(false), 3000);
    }, 500);
  };

  // Drag Handlers
  const handleMouseDown = (e: React.MouseEvent, item: CanvasItem) => {
    e.stopPropagation();
    setSelectedId(item.id);
    setIsDragging(true);
    const canvasRect = canvasRef.current?.getBoundingClientRect();
    if (!canvasRect) return;

    const mouseXInches = (e.clientX - canvasRect.left) / displayPpi;
    const mouseYInches = (e.clientY - canvasRect.top) / displayPpi;

    setDragOffset({
      x: mouseXInches - item.x,
      y: mouseYInches - item.y,
    });
  };

  const handleResizeMouseDown = (e: React.MouseEvent, corner: 'br' | 'tr' | 'bl' | 'tl') => {
    e.stopPropagation();
    if (!selectedItem) return;
    setIsResizing(true);
    setResizeCorner(corner);
    setInitialResizeState({
      x: selectedItem.x,
      y: selectedItem.y,
      w: selectedItem.width,
      h: selectedItem.height,
      startX: e.clientX,
      startY: e.clientY,
    });
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!canvasRef.current) return;
      const canvasRect = canvasRef.current.getBoundingClientRect();

      if (isDragging && selectedId) {
        const mouseXInches = (e.clientX - canvasRect.left) / displayPpi;
        const mouseYInches = (e.clientY - canvasRect.top) / displayPpi;

        let newX = mouseXInches - dragOffset.x;
        let newY = mouseYInches - dragOffset.y;

        // Snapping and boundary constraints
        newX = Math.max(0, Math.min(sheetWidthInches - (selectedItem?.width || 1), newX));
        newY = Math.max(0, Math.min(sheetHeightInches - (selectedItem?.height || 1), newY));

        setItems((prev) =>
          prev.map((i) =>
            i.id === selectedId
              ? { ...i, x: Number(newX.toFixed(2)), y: Number(newY.toFixed(2)) }
              : i
          )
        );
      } else if (isResizing && selectedId && initialResizeState && resizeCorner) {
        const deltaXInches = (e.clientX - initialResizeState.startX) / displayPpi;
        const deltaYInches = (e.clientY - initialResizeState.startY) / displayPpi;

        const aspectRatio = initialResizeState.w / initialResizeState.h;
        let newW = initialResizeState.w;
        let newH = initialResizeState.h;

        if (resizeCorner === 'br') {
          newW = Math.max(1, initialResizeState.w + deltaXInches);
          newH = newW / aspectRatio;
        }

        newW = Math.min(sheetWidthInches - initialResizeState.x, newW);
        newH = Math.min(sheetHeightInches - initialResizeState.y, newH);

        setItems((prev) =>
          prev.map((i) =>
            i.id === selectedId
              ? {
                  ...i,
                  width: Number(newW.toFixed(2)),
                  height: Number(newH.toFixed(2)),
                }
              : i
          )
        );
      }
    },
    [isDragging, isResizing, selectedId, dragOffset, displayPpi, sheetWidthInches, sheetHeightInches, selectedItem, initialResizeState, resizeCorner]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeCorner(null);
    setInitialResizeState(null);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div className="w-full bg-slate-900 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[750px]">
      {/* Left Control Sidebar */}
      <div className="w-full lg:w-80 bg-slate-950/90 border-b lg:border-b-0 lg:border-r border-slate-800 p-5 flex flex-col justify-between space-y-6 shrink-0">
        <div className="space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-red-600 rounded-xl text-white shadow-md">
                <Flame className="w-5 h-5 text-yellow-300" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-white">Gang Sheet Builder</h3>
                <p className="text-[11px] text-slate-400">Width: 22 inches fixed</p>
              </div>
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800/80 rounded-full">
              300 DPI Live
            </span>
          </div>

          {/* Sheet Size Selector */}
          <div>
            <label className="text-xs font-bold text-slate-300 flex items-center justify-between mb-1.5">
              <span>Choose Sheet Length:</span>
              <span className="text-red-400 font-extrabold">{currentSizeObj.size}</span>
            </label>
            <select
              value={sheetHeightInches}
              onChange={(e) => setSheetHeightInches(Number(e.target.value))}
              className="w-full bg-slate-900 border border-slate-700 text-white text-xs font-bold rounded-xl px-3 py-2.5 focus:outline-hidden focus:ring-2 focus:ring-red-500"
            >
              {GANG_SHEET_SIZES.map((size) => (
                <option key={size.size} value={size.height}>
                  {size.size} ({formatPrice(size.price)})
                </option>
              ))}
            </select>
          </div>

          {/* Upload Button */}
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png, image/jpeg, image/svg+xml, image/webp"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Designs (PNG, SVG)</span>
            </button>
            <p className="text-[10px] text-slate-400 text-center mt-1.5">
              Transparent background PNG recommended • No size limit
            </p>
          </div>

          {/* Auto-Nest & Actions */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAutoNest}
              className="py-2.5 px-3 bg-blue-600/20 hover:bg-blue-600/30 dark:bg-blue-600/20 dark:hover:bg-blue-600/30 light:bg-blue-50 light:hover:bg-blue-100 text-blue-300 dark:text-blue-300 light:text-blue-700 border border-blue-500/40 dark:border-blue-500/40 light:border-blue-200 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5"
              title="Automatically arrange artwork to minimize wasted space"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>Auto-Nest</span>
            </button>

            <button
              onClick={() => setShowGrid(!showGrid)}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border flex items-center justify-center space-x-1.5 ${
                showGrid
                  ? 'bg-slate-800 dark:bg-slate-800 light:bg-slate-200 text-white dark:text-white light:text-slate-900 border-slate-600 dark:border-slate-600 light:border-slate-300'
                  : 'bg-slate-900 dark:bg-slate-900 light:bg-slate-100 text-slate-400 dark:text-slate-400 light:text-slate-600 border-slate-800 dark:border-slate-800 light:border-slate-200'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>{showGrid ? 'Hide Grid' : 'Show Grid'}</span>
            </button>
          </div>

          {/* Space Utilization Meter */}
          <div className="bg-slate-900 dark:bg-slate-900 light:bg-slate-50 p-3.5 rounded-2xl border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-400 dark:text-slate-400 light:text-slate-600">Space Utilization</span>
              <span className={utilizationPercent > 75 ? 'text-emerald-500 font-bold' : 'text-amber-500 font-bold'}>
                {utilizationPercent}% Full
              </span>
            </div>
            <div className="w-full bg-slate-800 dark:bg-slate-800 light:bg-slate-200 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 rounded-full ${
                  utilizationPercent > 80 ? 'bg-emerald-500' : 'bg-red-500'
                }`}
                style={{ width: `${utilizationPercent}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-500">
              {items.length} artwork element{items.length === 1 ? '' : 's'} on sheet
            </p>
          </div>

          {/* Selected Item Inspector */}
          {selectedItem && (
            <div className="bg-slate-900/90 dark:bg-slate-900/90 light:bg-slate-50 p-3.5 rounded-2xl border border-red-500/30 space-y-3 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white dark:text-white light:text-slate-900 truncate max-w-[130px]">
                  {selectedItem.name}
                </span>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={handleDuplicate}
                    className="p-1.5 bg-slate-800 dark:bg-slate-800 light:bg-slate-200 hover:bg-slate-700 dark:hover:bg-slate-700 light:hover:bg-slate-300 rounded-lg text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-white dark:hover:text-white light:hover:text-black"
                    title="Duplicate design"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handleRotate}
                    className="p-1.5 bg-slate-800 dark:bg-slate-800 light:bg-slate-200 hover:bg-slate-700 dark:hover:bg-slate-700 light:hover:bg-slate-300 rounded-lg text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-white dark:hover:text-white light:hover:text-black"
                    title="Rotate 90°"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handleDelete}
                    className="p-1.5 bg-red-600/20 hover:bg-red-600 text-red-500 hover:text-white rounded-lg transition-colors"
                    title="Delete design"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Dimensions Input Controls */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="text-[10px] font-semibold text-slate-400 dark:text-slate-400 light:text-slate-600 block mb-1">
                    Width (Inches)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.5"
                    max={sheetWidthInches}
                    value={selectedItem.width}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (val > 0) {
                        const aspect = selectedItem.width / selectedItem.height;
                        setItems((prev) =>
                          prev.map((i) =>
                            i.id === selectedItem.id
                              ? { ...i, width: val, height: Number((val / aspect).toFixed(2)) }
                              : i
                          )
                        );
                      }
                    }}
                    className="w-full bg-slate-950 dark:bg-slate-950 light:bg-white border border-slate-700 dark:border-slate-700 light:border-slate-300 rounded-lg px-2.5 py-1.5 text-white dark:text-white light:text-slate-900 font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-slate-400 dark:text-slate-400 light:text-slate-600 block mb-1">
                    Height (Inches)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.5"
                    max={sheetHeightInches}
                    value={selectedItem.height}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (val > 0) {
                        const aspect = selectedItem.width / selectedItem.height;
                        setItems((prev) =>
                          prev.map((i) =>
                            i.id === selectedItem.id
                              ? { ...i, height: val, width: Number((val * aspect).toFixed(2)) }
                              : i
                          )
                        );
                      }
                    }}
                    className="w-full bg-slate-950 dark:bg-slate-950 light:bg-white border border-slate-700 dark:border-slate-700 light:border-slate-300 rounded-lg px-2.5 py-1.5 text-white dark:text-white light:text-slate-900 font-bold text-xs"
                  />
                </div>
              </div>

              {/* Live DPI Status */}
              <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-800">
                <span className="text-slate-400">Print Resolution:</span>
                {(() => {
                  const dpi = getDpi(selectedItem);
                  if (dpi >= 280) {
                    return (
                      <span className="text-emerald-400 font-bold flex items-center">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        {dpi} DPI (Pristine)
                      </span>
                    );
                  } else if (dpi >= 150) {
                    return (
                      <span className="text-amber-400 font-bold flex items-center">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        {dpi} DPI (Medium)
                      </span>
                    );
                  } else {
                    return (
                      <span className="text-red-400 font-bold flex items-center">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        {dpi} DPI (Low)
                      </span>
                    );
                  }
                })()}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Price & Add to Cart Box */}
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <div className="flex items-baseline justify-between">
            <span className="text-xs font-bold text-slate-400">Total Sheet Price:</span>
            <div className="text-right">
              <span className="text-xl font-black text-white">
                {formatPrice(currentSizeObj.price)}
              </span>
              <span className="text-[10px] text-slate-400 block">
                ({formatPrice(Number((currentSizeObj.price / sheetHeightInches).toFixed(2)))}/inch)
              </span>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isExporting}
            className="w-full py-3.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-extrabold text-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center space-x-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add Gang Sheet to Cart</span>
          </button>

          {addedNotice && (
            <div className="bg-emerald-950/80 text-emerald-300 border border-emerald-800 p-2 rounded-xl text-xs font-bold text-center animate-in fade-in">
              ✓ Custom Gang Sheet added to your cart!
            </div>
          )}
        </div>
      </div>

      {/* Right Canvas Area */}
      <div className="flex-1 bg-slate-900/50 p-4 sm:p-6 lg:p-8 flex flex-col justify-between overflow-hidden relative">
        {/* Canvas Toolbar */}
        <div className="flex items-center justify-between mb-4 z-10">
          <div className="flex items-center space-x-2 bg-slate-950/80 dark:bg-slate-950/80 light:bg-white px-3 py-1.5 rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 text-xs text-slate-300 dark:text-slate-300 light:text-slate-700 shadow-xs">
            <span className="font-bold text-white dark:text-white light:text-slate-900">Canvas:</span>
            <span>22&quot; Wide × {sheetHeightInches}&quot; Long</span>
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center space-x-1.5 bg-slate-950/80 dark:bg-slate-950/80 light:bg-white p-1 rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 shadow-xs">
            <button
              onClick={() => setZoom(Math.max(0.4, zoom - 0.1))}
              className="p-1.5 text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-black rounded-lg hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-100"
              title="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-slate-300 dark:text-slate-300 light:text-slate-800 px-2">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom(Math.min(2.0, zoom + 0.1))}
              className="p-1.5 text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-black rounded-lg hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-100"
              title="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoom(1)}
              className="px-2 py-1 text-[11px] font-bold text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-black rounded-lg hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-100"
              title="Reset zoom"
            >
              100%
            </button>
          </div>
        </div>

        {/* Scrollable Canvas Container */}
        <div 
          onClick={() => setSelectedId(null)}
          className="flex-1 overflow-auto flex items-start justify-center p-6 bg-slate-950/40 rounded-2xl border border-slate-800/80 min-h-[500px]"
        >
          <div
            ref={canvasRef}
            style={{
              width: `${sheetWidthInches * displayPpi}px`,
              height: `${sheetHeightInches * displayPpi}px`,
            }}
            className={`relative bg-white rounded-xl shadow-2xl border-4 border-slate-700 transition-all select-none overflow-hidden ${
              showGrid ? 'bg-grid-pattern' : ''
            }`}
          >
            {/* Safe Margin Border (0.25" dashed border) */}
            <div 
              style={{
                top: `${0.25 * displayPpi}px`,
                left: `${0.25 * displayPpi}px`,
                right: `${0.25 * displayPpi}px`,
                bottom: `${0.25 * displayPpi}px`,
              }}
              className="absolute border border-dashed border-red-300/60 pointer-events-none z-0"
            />

            {/* Rulers / Dimension labels */}
            <div className="absolute top-2 left-2 text-[10px] font-bold text-slate-400 pointer-events-none">
              0,0
            </div>
            <div className="absolute top-2 right-2 text-[10px] font-bold text-slate-400 pointer-events-none">
              22&quot;
            </div>
            <div className="absolute bottom-2 right-2 text-[10px] font-bold text-slate-400 pointer-events-none">
              22&quot; × {sheetHeightInches}&quot;
            </div>

            {/* Canvas Items */}
            {items.map((item) => {
              const isSelected = item.id === selectedId;
              const leftPx = item.x * displayPpi;
              const topPx = item.y * displayPpi;
              const widthPx = item.width * displayPpi;
              const heightPx = item.height * displayPpi;

              return (
                <div
                  key={item.id}
                  onMouseDown={(e) => handleMouseDown(e, item)}
                  style={{
                    left: `${leftPx}px`,
                    top: `${topPx}px`,
                    width: `${widthPx}px`,
                    height: `${heightPx}px`,
                    transform: `rotate(${item.rotation}deg)`,
                  }}
                  className={`absolute group cursor-move select-none z-10 transition-shadow ${
                    isSelected
                      ? 'ring-2 ring-red-600 ring-offset-2 ring-offset-white shadow-xl'
                      : 'hover:ring-1 hover:ring-slate-400'
                  }`}
                >
                  <div className="relative w-full h-full pointer-events-none">
                    <img
                      src={item.src}
                      alt={item.name}
                      className="w-full h-full object-contain pointer-events-none drop-shadow-xs"
                      draggable={false}
                    />
                  </div>

                  {/* Size Label Tooltip on item */}
                  <div className="absolute -top-6 left-0 bg-black/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    {item.width}&quot; × {item.height}&quot; • {getDpi(item)} DPI
                  </div>

                  {/* Resize Handle (Bottom Right) */}
                  {isSelected && (
                    <div
                      onMouseDown={(e) => handleResizeMouseDown(e, 'br')}
                      className="absolute -bottom-2 -right-2 w-4 h-4 bg-red-600 border-2 border-white rounded-full cursor-nwse-resize shadow-md z-20 hover:scale-125 transition-transform"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Tips */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2 z-10">
          <div className="flex items-center space-x-2">
            <Info className="w-4 h-4 text-blue-400 shrink-0" />
            <span>Click &amp; drag artwork to reposition • Use bottom-right dot to resize</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-slate-300 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 mr-1.5" /> 300 DPI Verified
            </span>
            <span className="flex items-center text-slate-300 font-medium">
              <span className="w-2 h-2 rounded-full bg-red-400 mr-1.5" /> 0.25&quot; Safe Margin
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
