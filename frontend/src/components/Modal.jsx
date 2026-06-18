/* eslint-disable no-unused-vars */
import React from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Modal = ({
    children, isOpen, onClose, title, hideHeader, showActionBtn, actionBtnIcon = null,
    actionBtnText, onActionClick = () => { }, maxWidth = 'max-w-4xl', actionBtnClassName = 'btn-primary'
}) => {
    if (typeof document === 'undefined') return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 p-4 sm:p-6"
                    onClick={(e) => e.target === e.currentTarget && onClose()}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className={`relative flex flex-col bg-white shadow-2xl rounded-2xl overflow-hidden border border-app-border ${maxWidth} w-full max-h-[90vh]`}
                    >
                        {!hideHeader && (
                            <div className="flex items-center justify-between p-5 border-b border-app-border shrink-0 bg-app-bg">
                                <h3 className="text-lg font-bold text-text-main">
                                    {title}
                                </h3>
                                {showActionBtn && (
                                    <button
                                        className={`flex items-center justify-center gap-2 px-5 py-2.5 font-semibold rounded-lg transition-colors text-sm mr-10 ${actionBtnClassName.includes('bg-') ? actionBtnClassName : 'btn-primary'}`}
                                        onClick={onActionClick}
                                    >
                                        {actionBtnIcon}
                                        {actionBtnText}
                                    </button>
                                )}
                            </div>
                        )}

                        <button
                            type='button'
                            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-secondary hover:bg-app-border text-text-muted hover:text-text-main rounded-full transition-colors z-10"
                            onClick={onClose}
                        >
                            <X size={18} />
                        </button>

                        {/* overflow-x-hidden here is critical — prevents children from causing horizontal scroll */}
                        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden custom-scrollbar bg-white">
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    )
}

export default Modal