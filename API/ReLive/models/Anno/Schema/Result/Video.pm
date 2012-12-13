use utf8;
package Anno::Schema::Result::Video;

use strict;
use warnings;

use base 'DBIx::Class::Core';
__PACKAGE__->load_components("InflateColumn::DateTime");
__PACKAGE__->table("videos");
__PACKAGE__->add_columns(
    "video_id",
    {data_type => "char", is_nullable => 0, size => 255},
    "title",
    {data_type => "char", is_nullable => 0, size => 255},
    "url",
    {data_type => "char", is_nullable => 0, size => 512},
);

__PACKAGE__->set_primary_key("video_id");

__PACKAGE__->has_many(
    "comments",
    "Anno::Schema::Result::VideoComments",
    "video_id"
);


1;
