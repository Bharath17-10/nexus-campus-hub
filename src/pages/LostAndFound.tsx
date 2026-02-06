import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Search, Package, AlertCircle, Loader2, MapPin, Phone } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { analyzeImage, uploadImage } from '@/services/imageRecognition.service';
import { addLostFoundItem, getLostFoundItems, type LostFoundItem } from '@/services/firestore.service';
import { useEffect } from 'react';

const LostAndFound = () => {
    const { userProfile } = useAuth();
    const [activeTab, setActiveTab] = useState<'lost' | 'found'>('lost');
    const [items, setItems] = useState<LostFoundItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');

    // Form state
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [contactInfo, setContactInfo] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');

    useEffect(() => {
        loadItems();
    }, [activeTab]);

    const loadItems = async () => {
        setLoading(true);
        try {
            const fetchedItems = await getLostFoundItems(activeTab);
            setItems(fetchedItems);
        } catch (err) {
            console.error('Error loading items:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userProfile) return;

        setUploading(true);
        setError('');

        try {
            let imageUrl = '';
            let aiTags: string[] = [];

            // Upload image and analyze if provided
            if (imageFile) {
                imageUrl = await uploadImage(imageFile, 'lost-found');
                const analysis = await analyzeImage(imageFile);
                aiTags = analysis.tags;
            }

            // Create item
            const item: LostFoundItem = {
                userId: userProfile.uid,
                userName: userProfile.displayName,
                type: activeTab,
                title,
                description,
                imageUrl,
                aiTags,
                location,
                contactInfo,
                status: 'active',
                createdAt: new Date(),
            };

            await addLostFoundItem(item);

            // Reset form
            setTitle('');
            setDescription('');
            setLocation('');
            setContactInfo('');
            setImageFile(null);
            setImagePreview('');

            // Reload items
            await loadItems();
        } catch (err: any) {
            setError(err.message || 'Failed to submit item');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="min-h-screen p-4 md:p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">Lost & Found</h1>
                    <p className="text-muted-foreground">Report lost items or help others find their belongings</p>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Submit Form */}
                    <Card className="p-6">
                        <h2 className="text-xl font-semibold mb-4">Report an Item</h2>

                        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'lost' | 'found')}>
                            <TabsList className="grid w-full grid-cols-2 mb-6">
                                <TabsTrigger value="lost">I Lost Something</TabsTrigger>
                                <TabsTrigger value="found">I Found Something</TabsTrigger>
                            </TabsList>

                            <TabsContent value={activeTab}>
                                {error && (
                                    <Alert variant="destructive" className="mb-4">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertDescription>{error}</AlertDescription>
                                    </Alert>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Item Name</Label>
                                        <Input
                                            id="title"
                                            placeholder="e.g., Blue Backpack, iPhone 13"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            placeholder="Provide details about the item..."
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            required
                                            rows={3}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="location">Location</Label>
                                        <Input
                                            id="location"
                                            placeholder="Where was it lost/found?"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="contact">Contact Info</Label>
                                        <Input
                                            id="contact"
                                            placeholder="Email or phone number"
                                            value={contactInfo}
                                            onChange={(e) => setContactInfo(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="image">Upload Image (Optional)</Label>
                                        <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                                            {imagePreview ? (
                                                <div className="relative">
                                                    <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded" />
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        className="mt-2"
                                                        onClick={() => {
                                                            setImageFile(null);
                                                            setImagePreview('');
                                                        }}
                                                    >
                                                        Remove
                                                    </Button>
                                                </div>
                                            ) : (
                                                <label htmlFor="image" className="cursor-pointer">
                                                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                                                    <p className="text-sm text-muted-foreground">Click to upload image</p>
                                                    <p className="text-xs text-muted-foreground mt-1">AI will analyze the image</p>
                                                </label>
                                            )}
                                            <input
                                                id="image"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="hidden"
                                            />
                                        </div>
                                    </div>

                                    <Button type="submit" className="w-full" disabled={uploading}>
                                        {uploading ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Submitting...
                                            </>
                                        ) : (
                                            <>
                                                <Package className="w-4 h-4 mr-2" />
                                                Submit Report
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </TabsContent>
                        </Tabs>
                    </Card>

                    {/* Items List */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold">
                                {activeTab === 'lost' ? 'Lost Items' : 'Found Items'}
                            </h2>
                            <Button variant="outline" size="sm" onClick={loadItems}>
                                <Search className="w-4 h-4 mr-2" />
                                Refresh
                            </Button>
                        </div>

                        {loading ? (
                            <div className="flex items-center justify-center py-12">
                                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                            </div>
                        ) : items.length === 0 ? (
                            <Card className="p-8 text-center">
                                <Package className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                                <p className="text-muted-foreground">No {activeTab} items reported yet</p>
                            </Card>
                        ) : (
                            <div className="space-y-3">
                                {items.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <Card className="p-4">
                                            <div className="flex gap-4">
                                                {item.imageUrl && (
                                                    <img
                                                        src={item.imageUrl}
                                                        alt={item.title}
                                                        className="w-20 h-20 object-cover rounded"
                                                    />
                                                )}
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                                                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>

                                                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                                                        <MapPin className="w-3 h-3" />
                                                        {item.location}
                                                    </div>

                                                    {item.aiTags.length > 0 && (
                                                        <div className="flex flex-wrap gap-1 mt-2">
                                                            {item.aiTags.slice(0, 3).map((tag, idx) => (
                                                                <Badge key={idx} variant="secondary" className="text-xs">
                                                                    {tag}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    )}

                                                    <div className="flex items-center gap-2 mt-3">
                                                        <Button size="sm" variant="outline">
                                                            <Phone className="w-3 h-3 mr-1" />
                                                            Contact
                                                        </Button>
                                                        <span className="text-xs text-muted-foreground">
                                                            by {item.userName}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LostAndFound;
