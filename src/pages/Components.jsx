import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Button, 
  Input, 
  Card, 
  Badge, 
  Modal, 
  Loading, 
  ProgressBar, 
  Avatar, 
  Tooltip 
} from '../components/common';
import { Mail, Search, User, Star } from 'lucide-react';

const Components = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Component Library</h1>
        <p className="text-xl text-gray-600">Thư viện các component cho KoreanHwa</p>
      </div>

      {/* Buttons */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Buttons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Variants</h3>
            <div className="space-y-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="success">Success</Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Sizes</h3>
            <div className="space-y-3">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button size="xl">Extra Large</Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">States</h3>
            <div className="space-y-3">
              <Button>Normal</Button>
              <Button disabled>Disabled</Button>
              <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Inputs */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Inputs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Basic Inputs</h3>
            <div className="space-y-4">
              <Input label="Email" placeholder="Enter your email" leftIcon={<Mail className="w-4 h-4" />} />
              <Input label="Search" placeholder="Search..." rightIcon={<Search className="w-4 h-4" />} />
              <Input label="Username" placeholder="Enter username" />
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Input States</h3>
            <div className="space-y-4">
              <Input label="Success Input" value="Success value" success="Input is valid!" />
              <Input label="Error Input" value="Error value" error="This field is required" />
              <Input label="Disabled Input" value="Disabled" disabled />
            </div>
          </Card>
        </div>
      </section>

      {/* Cards */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card variant="default" className="p-6">
            <h3 className="font-semibold mb-2">Default Card</h3>
            <p className="text-gray-600">This is a default card with hover effects.</p>
          </Card>

          <Card variant="elevated" className="p-6">
            <h3 className="font-semibold mb-2">Elevated Card</h3>
            <p className="text-gray-600">This card has more shadow and elevation.</p>
          </Card>

          <Card variant="outlined" className="p-6">
            <h3 className="font-semibold mb-2">Outlined Card</h3>
            <p className="text-gray-600">This card has a border outline.</p>
          </Card>

          <Card variant="filled" className="p-6">
            <h3 className="font-semibold mb-2">Filled Card</h3>
            <p className="text-gray-600">This card has a background fill.</p>
          </Card>
        </div>
      </section>

      {/* Badges */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Badges</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Badge Variants</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Default</Badge>
              <Badge variant="primary">Primary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
              <Badge variant="info">Info</Badge>
              <Badge variant="purple">Purple</Badge>
              <Badge variant="pink">Pink</Badge>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Badge Sizes</h3>
            <div className="flex flex-wrap gap-2 items-center">
              <Badge size="sm">Small</Badge>
              <Badge size="md">Medium</Badge>
              <Badge size="lg">Large</Badge>
            </div>
          </Card>
        </div>
      </section>

      {/* Progress Bars */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Progress Bars</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Progress Variants</h3>
            <div className="space-y-4">
              <ProgressBar progress={75} variant="default" label="Default Progress" />
              <ProgressBar progress={60} variant="success" label="Success Progress" />
              <ProgressBar progress={45} variant="warning" label="Warning Progress" />
              <ProgressBar progress={30} variant="danger" label="Danger Progress" />
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Progress Sizes</h3>
            <div className="space-y-4">
              <ProgressBar progress={80} size="sm" label="Small Progress" />
              <ProgressBar progress={70} size="md" label="Medium Progress" />
              <ProgressBar progress={60} size="lg" label="Large Progress" />
              <ProgressBar progress={50} size="xl" label="Extra Large Progress" />
            </div>
          </Card>
        </div>
      </section>

      {/* Avatars */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Avatars</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Avatar Sizes</h3>
            <div className="flex items-center space-x-4">
              <Avatar size="xs" />
              <Avatar size="sm" />
              <Avatar size="md" />
              <Avatar size="lg" />
              <Avatar size="xl" />
              <Avatar size="2xl" />
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Avatar with Status</h3>
            <div className="flex items-center space-x-4">
              <Avatar size="md" status="online" />
              <Avatar size="md" status="offline" />
              <Avatar size="md" status="away" />
              <Avatar size="md" status="busy" />
            </div>
          </Card>
        </div>
      </section>

      {/* Loading */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Loading</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-4">Spinner</h3>
            <Loading variant="spinner" />
          </Card>

          <Card className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-4">Dots</h3>
            <Loading variant="dots" />
          </Card>

          <Card className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-4">Pulse</h3>
            <Loading variant="pulse" />
          </Card>
        </div>
      </section>

      {/* Tooltips */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Tooltips</h2>
        <Card className="p-6">
          <div className="flex items-center space-x-8">
            <Tooltip content="This is a tooltip on top" position="top">
              <Button>Hover me (Top)</Button>
            </Tooltip>

            <Tooltip content="This is a tooltip on bottom" position="bottom">
              <Button>Hover me (Bottom)</Button>
            </Tooltip>

            <Tooltip content="This is a tooltip on left" position="left">
              <Button>Hover me (Left)</Button>
            </Tooltip>

            <Tooltip content="This is a tooltip on right" position="right">
              <Button>Hover me (Right)</Button>
            </Tooltip>
          </div>
        </Card>
      </section>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Demo Modal"
        size="md"
      >
        <div className="space-y-4">
          <p>This is a demo modal showcasing the Modal component.</p>
          <div className="flex justify-end space-x-3">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsModalOpen(false)}>
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Components; 